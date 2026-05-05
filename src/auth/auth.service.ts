import { ConsoleLogger, Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    private readonly logger = new ConsoleLogger(AuthService.name);
    constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {}
    async register(registerDto: RegisterDto) {
        const {name, email, password} = registerDto;
        const existingUser = await this.userService.findUserByEmail(email);
        if(existingUser) {
            throw new Error('User with this email already exists');
        }
        const user = await this.userService.createUser(name, email, password);
        const payload = { sub: user.userId, username: user.username };
        return {
        // 💡 Here the JWT secret key that's used for signing the payload 
        // is the key that was passed in the JwtModule
        access_token: await this.jwtService.signAsync(payload),
        };
        this.logger.log('User registered successfully');
        return 'User registered successfully';
    }
}
