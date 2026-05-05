import { ConsoleLogger, Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { LoginDto } from './dto/login.dto'

@Injectable()
export class AuthService {
    private readonly logger = new ConsoleLogger(AuthService.name);
    constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {}
    async register(registerDto: RegisterDto) {
        const { name, email, password } = registerDto;
        const existingUser = await this.userService.findUserByEmail(email);
        if (existingUser) {
            throw new BadRequestException('User with this email already exists');
        }
        const saltRounds = 10;
        const hashed = await bcrypt.hash(password, saltRounds);
        const user = await this.userService.createUser(name, email, hashed);
        const payload = { sub: user.userId, username: user.name };
        this.logger.log('User registered successfully');
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }

    async login(loginDto: LoginDto) {
        const { email, password } = loginDto;
        const user = await this.userService.findUserByEmail(email);
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }
        const passwordMatches = await bcrypt.compare(password, user.password);
        if (!passwordMatches) {
            throw new UnauthorizedException('Invalid credentials');
        }
        const payload = { sub: user.userId, username: user.name };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}
