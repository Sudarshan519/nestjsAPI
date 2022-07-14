import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../services/auth/auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(
        @Inject('AUTH_SERVICE') private readonly authService: AuthService
    ) {
        super();
        // super({ usernameField: 'email' });
    }
    async validate(username: string, password: string) {

        const user = await this.authService.validateUser(username, password);
        if (!user) {
            throw new UnauthorizedException();

        }
        console.log(user);
        return user;
    }
}