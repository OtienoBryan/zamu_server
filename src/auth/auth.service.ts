import { Injectable, UnauthorizedException, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Staff } from '../entities/staff.entity';
import { LoginDto } from './dto/login.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { JwtService } from './jwt.service';
import * as bcrypt from 'bcryptjs';

export interface AuthResponse {
  token: string;
  user: {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
    storeId: number | null;
  };
}

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Staff)
    private staffRepository: Repository<Staff>,
    private jwtService: JwtService,
  ) {}

  async validateStaff(email: string, password: string): Promise<Staff | null> {
    console.log('🔍 [AuthService] Validating staff with email:', email);
    
    try {
      // Input validation
      if (!email || !password) {
        console.log('❌ [AuthService] Missing email or password');
        return null;
      }

      if (!email.includes('@')) {
        console.log('❌ [AuthService] Invalid email format:', email);
        return null;
      }
      
      let staff: Staff | null;
      try {
        staff = await this.staffRepository.findOne({ where: { business_email: email } });
      } catch (dbError) {
        console.error('❌ [AuthService] Database error during staff lookup:', dbError);
        // Don't throw here, just return null to indicate validation failed
        // The login method will handle it appropriately
        return null;
      }
      
      if (!staff) {
        console.log('❌ [AuthService] No staff found with email:', email);
        return null;
      }
      
      console.log('✅ [AuthService] Staff found:', {
        id: staff.id,
        name: staff.name,
        email: staff.business_email,
        is_active: staff.is_active
      });
      
      if (!staff.is_active) {
        console.log('❌ [AuthService] Staff is not active');
        return null;
      }

      // Check if staff has a password set
      if (!staff.password) {
        console.log('❌ [AuthService] Staff has no password set');
        return null;
      }

      // Secure password comparison using bcrypt
      let isPasswordValid: boolean;
      try {
        isPasswordValid = await bcrypt.compare(password, staff.password);
        console.log('🔐 [AuthService] Password validation result:', isPasswordValid);
      } catch (bcryptError) {
        console.error('❌ [AuthService] Error during password comparison:', bcryptError);
        return null;
      }
      
      if (!isPasswordValid) {
        console.log('❌ [AuthService] Invalid password');
        return null;
      }

      console.log('✅ [AuthService] Staff validation successful');
      return staff;
    } catch (error) {
      console.error('❌ [AuthService] Unexpected error during validation:', error);
      console.error('❌ [AuthService] Error details:', {
        message: error.message,
        stack: error.stack,
        code: error.code
      });
      // Return null instead of throwing to prevent 500 errors
      // The login method will handle null as invalid credentials
      return null;
    }
  }

  async login(loginDto: LoginDto): Promise<AuthResponse> {
    console.log('🔐 [AuthService] Starting login process');
    
    try {
      const { email, password } = loginDto;
      
      // Basic input validation
      if (!email || !password) {
        console.log('❌ [AuthService] Missing email or password in login request');
        throw new UnauthorizedException('Email and password are required');
      }
      
      let staff: Staff | null;
      try {
        staff = await this.validateStaff(email, password);
      } catch (error) {
        console.error('❌ [AuthService] Error during staff validation:', error);
        // If validateStaff throws an error, convert it to UnauthorizedException
        throw new UnauthorizedException('Authentication service temporarily unavailable. Please try again later.');
      }
      
      if (!staff) {
        console.log('❌ [AuthService] Staff validation failed');
        throw new UnauthorizedException('Invalid credentials');
      }

      // Generate JWT token
      let token: string;
      try {
        const tokenPayload = {
          sub: staff.id,
          email: staff.business_email,
          role: staff.role,
          name: staff.name,
          iat: Math.floor(Date.now() / 1000)
        };
        
        token = this.jwtService.generateToken(tokenPayload);
      } catch (error) {
        console.error('❌ [AuthService] Error generating token:', error);
        throw new UnauthorizedException('Token generation failed. Please try again.');
      }

      console.log('✅ [AuthService] Login successful for:', email);
      
      return {
        token,
        user: {
          id: staff.id,
          // staff was looked up by this exact email, so it's guaranteed set here
          // even though the column itself is nullable.
          email: staff.business_email ?? email,
          firstName: staff.name.split(' ')[0] || staff.name,
          lastName: staff.name.split(' ').slice(1).join(' ') || '',
          role: staff.role,
          storeId: staff.store_id,
        },
      };
    } catch (error) {
      console.error('❌ [AuthService] Login error:', error);
      console.error('❌ [AuthService] Error stack:', error.stack);
      
      // Re-throw UnauthorizedException as-is (NestJS will convert to 401)
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      
      // Convert any other errors to UnauthorizedException
      // This prevents 500 errors and returns 401 instead
      throw new UnauthorizedException('Login failed. Please check your credentials and try again.');
    }
  }

  async getStaffById(id: number): Promise<Staff | null> {
    return this.staffRepository.findOne({ where: { id } });
  }

  async validateToken(token: string): Promise<Staff | null> {
    try {
      const payload = this.jwtService.verifyToken(token);
      if (!payload || !payload.sub) {
        console.log('❌ [AuthService] Invalid token payload');
        return null;
      }
      
      if (this.jwtService.isTokenExpired(token)) {
        console.log('❌ [AuthService] Token expired');
        return null;
      }
      
      return this.getStaffById(payload.sub);
    } catch (error) {
      console.error('❌ [AuthService] Token validation error:', error);
      return null;
    }
  }

  async updateProfile(id: number, dto: UpdateProfileDto): Promise<Staff> {
    const staff = await this.staffRepository.findOne({ where: { id } });
    if (!staff) {
      throw new NotFoundException('Staff not found');
    }
    if (dto.name !== undefined) staff.name = dto.name;
    if (dto.phoneNumber !== undefined) staff.phone_number = dto.phoneNumber;
    if (dto.businessEmail !== undefined) staff.business_email = dto.businessEmail;
    return this.staffRepository.save(staff);
  }

  async changePassword(id: number, dto: ChangePasswordDto): Promise<void> {
    const staff = await this.staffRepository.findOne({ where: { id } });
    if (!staff) {
      throw new NotFoundException('Staff not found');
    }
    if (!staff.password) {
      throw new BadRequestException('This account has no password set');
    }
    const isCurrentValid = await bcrypt.compare(dto.currentPassword, staff.password);
    if (!isCurrentValid) {
      throw new UnauthorizedException('Current password is incorrect');
    }
    staff.password = await this.hashPassword(dto.newPassword);
    await this.staffRepository.save(staff);
  }

  async hashPassword(password: string): Promise<string> {
    const saltRounds = 12;
    return bcrypt.hash(password, saltRounds);
  }

  async verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
}
