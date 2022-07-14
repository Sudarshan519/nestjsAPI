import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/users/dto/CreateUser.dto';
import { SerializedUser, User } from 'src/users/types';
import { encodePassword } from 'src/utils/bcrypt';
import { Repository } from 'typeorm';
import { User as UserEntity } from '../../../typeorm'
@Injectable()
export class UsersService {
    constructor(@InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>) {

    }
    private users: User[] = [
        {
            id: 1,
            username: 'anson',
            password: 'anson'
        },
        {
            id: 2,
            username: 'danny',
            password: 'danny'
        },
        {
            id: 3,
            username: 'samantha',
            password: 'samantha'
        },

    ];
    // plainToClass(SerializedUser, user))
    getUsers() {
        return this.users.map((user) => new SerializedUser(user));
    }

    getUserbyUsername(username: string) {
        return this.users.find((user) => user.username === username);

    }
    getUserById(id: number) {
        return this.users.find((user) => user.id === id);

    }

    createUser(createUserDto: CreateUserDto) {
        const password = encodePassword(createUserDto.password);
        const newUser = this.userRepository.create({ ...createUserDto, password });
        return this.userRepository.save(newUser);
    }

    findUserByUsername(username: string) {
        return this.userRepository.findOne({ where: { username: username } });

    }

    findUserById(id: number) {
        return this.userRepository.findOne({ where: { id: id } });
    }
}
