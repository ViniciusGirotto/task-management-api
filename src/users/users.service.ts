import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import {v4 as uuid} from 'uuid';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    private readonly users: CreateUserDto[] = [];
    create(newUser: CreateUserDto) {
        newUser.id = uuid();
        newUser.password = bcrypt.hashSync(newUser.password, 10);
        this.users.push(newUser);
    }

    findByUserName(userName: string):CreateUserDto | null {
        return this.users.find(user => user.userName === userName);
    }
}
