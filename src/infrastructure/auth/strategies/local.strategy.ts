import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'my-local') {
    constructor(private authService: AuthService) {
        super({
            usernameField: 'login',
            passwordField: 'pass'
        });
    }
    async validate(user_email: string, user_password: string): Promise<any> {
        const user = await this.authService.validateUser({
            user_email,
            user_password
        });

        if (!user) {
            throw new UnauthorizedException();
        }
        return user;

    }
}