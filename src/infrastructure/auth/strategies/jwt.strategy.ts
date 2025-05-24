import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy} from 'passport-jwt';

import { JWT_SECRETS } from "../configs/jwt-secrets";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: JWT_SECRETS
        });
    }

    async validate(payload: {sub: string; user_email: string}) {
        return { user_id: payload.sub, user_email: payload.user_email};
    }
}



