import { Inject, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/services/users/users.service';
import { comparePasswords } from 'src/utils/bcrypt';

@Injectable()
export class AuthService {

    constructor(
        @Inject('USER_SERVICE') private readonly userService: UsersService
    ) {

    }

    async validateUser(username: string, password: string) {
        console.log('Inside validateUser');
        console.log(username)
        const userDB = await this.userService.findUserByUsername(username);

        if (userDB) {
            const matched = comparePasswords(password, userDB.password);

            console.log(matched);
            if (matched) {
                return userDB;
            }

        } else {
            console.log("Password do not match");
        }
        console.log('User Validation Failed!');
        return null;
    }

}
