import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service'

@Injectable()
export class UserService {
    constructor(private readonly prismaService: PrismaService) {}

    async findUserByEmail(email: string): Promise<any> {
        const user = await this.prismaService.user.findFirst({
            where: {
                email: email
            }
        })
        return user;
    }

    async createUser(name: string, email: string, password: string): Promise<any> {
        const user = await this.prismaService.user.create({
            data: {
                name,
                email,
                password
            }
        })
        return user;
    }
}
