import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UserService {
    constructor (
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ){}

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        const user = this.userRepository.create(createUserDto);
        const response = await this.userRepository.save(user);
        console.log("The created user is", response)
        return user;
    }

    async findByEmail(email: string): Promise<User | undefined> {

        return this.userRepository.findOne({ where: { email } });
    }
    
    async findById(id: string): Promise<User | undefined> {

        return this.userRepository.findOne({ where: { id } });
    }
    async validateUser(email: string, password: string): Promise<User | null> {

        console.log("Test from service, Email: ", email, " And Password: ", password);
        const user = await this.findByEmail(email);
        if (user && await bcrypt.compare(password, user.password)) {
          return user;
        }
        return null;
      }
}
