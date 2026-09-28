import { Repository } from 'typeorm';
import { Staff } from '../entities/staff.entity';
import { LoginDto } from './dto/login.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { JwtService } from './jwt.service';
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
export declare class AuthService {
    private staffRepository;
    private jwtService;
    constructor(staffRepository: Repository<Staff>, jwtService: JwtService);
    validateStaff(email: string, password: string): Promise<Staff | null>;
    login(loginDto: LoginDto): Promise<AuthResponse>;
    getStaffById(id: number): Promise<Staff | null>;
    validateToken(token: string): Promise<Staff | null>;
    updateProfile(id: number, dto: UpdateProfileDto): Promise<Staff>;
    changePassword(id: number, dto: ChangePasswordDto): Promise<void>;
    hashPassword(password: string): Promise<string>;
    verifyPassword(password: string, hashedPassword: string): Promise<boolean>;
}
