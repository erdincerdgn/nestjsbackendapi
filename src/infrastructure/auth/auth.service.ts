import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

import { UserPrismaRepository } from "../prisma/user-prisma.repository";

type AuthInput = {user_email: string; user_password: string};
type SignInData = { user_id: string; user_email: string};
type AuthResult = { accessToken: string; user_id: string; user_email: string}


@Injectable()
export class AuthService {
    constructor(
        private userService: UserPrismaRepository,
        private jwtService: JwtService
    ) {}

    async authenticate(input: AuthInput): Promise<AuthResult> {
        const user = await this.validateUser(input);

        if(!user) {
            throw new UnauthorizedException();
        }

        return this.signIn(user);
    }


    async validateUser(input: AuthInput): Promise<SignInData | null> {
        const user = await this.userService.findByEmail(input.user_email);

        if(user && user.user_password === input.user_password) {
            return {
                user_id: user.user_id,
                user_email: user.user_email
            };
        }

        return null;
    }

    async signIn(user: SignInData): Promise<AuthResult> {
        const tokenPayload = {
            sub: user.user_id,
            user_email: user.user_email
        };
        const accessToken = await this.jwtService.signAsync(tokenPayload);

        return { accessToken, user_email: user.user_email, user_id: user.user_id};
    }

}