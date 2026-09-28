import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(loginDto: LoginDto): Promise<import("./auth.service").AuthResponse>;
    getProfile(req: any): Promise<{
        id: number;
        email: string | null;
        firstName: string;
        lastName: string;
        role: string;
        storeId: number | null;
        phoneNumber: string | null;
    }>;
    updateProfile(req: any, dto: UpdateProfileDto): Promise<{
        id: number;
        email: string | null;
        firstName: string;
        lastName: string;
        role: string;
        storeId: number | null;
        phoneNumber: string | null;
    }>;
    changePassword(req: any, dto: ChangePasswordDto): Promise<{
        message: string;
    }>;
}
