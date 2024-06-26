import { CreateUserDto } from './dto/user.dto';
import { UserService } from './user.service';
import { User as UserEntity} from './entities/user.entity'
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService
    ) {}

    @Post()
    create(@Body() createUserDto: CreateUserDto) {
        const user = this.userService.createUser(createUserDto);
        console.log("This is user", user);
        return user;
    }

    @Get('by-email/:email')
    async getUserByEmail(@Param('email') email: string) {
        return this.userService.findByEmail(email);
    }

    @Get('by-id/:id')
    async getUserById(@Param('id') id: string) {

        return this.userService.findById(id);
    }

    @Post('login')
    async login(@Body() body: { email: string; password: string }) {
        // const userNew = {
        //     email: 'tesfamikael4@gmail.com',
        //     password: '$2b$10$lbFh7732Mo4F1manhzX5U.sN.1sPyQr4dFYEA026MJcop6Sitl63y',
        //     firstName: 'Tesfaye',
        //     middleName: "Bekele",
        //     lastName: 'Kassa',
        //     role: 'Admin',
        //     status: 'Active',
        //     profile: "default.png", 
        //     emailVerified: new Date
        // }
        // this.userService.createUser(userNew);
        // const pass = await bcrypt.hash("123123",10);
       
        const { email, password } = body;
        const user = await this.userService.validateUser(email, password);
        if (user) {
            const name = user.firstName+" "+user.middleName+" "+user.lastName
            return {
                id: user.id,
                email: user.email,
                name,
                profile: user.profile,
                role: user.role,
                emailVerified: user.emailVerified
            };
        }
        return null;
    }

}
