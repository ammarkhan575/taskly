import { Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService) {}
    register(registerDto: RegisterDto) {
        const {name, email, password} = registerDto;
        // Here you would typically save the user to the database and perform any necessary logic
        // For this example, we'll just return a success message
        return 'User registered successfully';
    }
}
