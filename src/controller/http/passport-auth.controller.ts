import { Body, Controller, Get, HttpCode, HttpStatus, NotImplementedException, Post, Request, UnauthorizedException, UseGuards } from "@nestjs/common";
import { AuthService } from "src/infrastructure/auth/auth.service";
import { PassportJwtAuthGuard } from "src/infrastructure/auth/guards/passport-jwt.guard";
import { PassportLocalGuard } from "src/infrastructure/auth/strategies/passport-local.guard";

@Controller('auth-v2')
export class PassportAuthController {
    constructor(private authService: AuthService) {}


    @HttpCode(HttpStatus.OK)
    @Post('login')
    @UseGuards(PassportLocalGuard)
    login(@Request() request) {
        return this.authService.signIn(request.user);
    }

    @Get('me')
    @UseGuards(PassportJwtAuthGuard)
    getUserInfo(@Request() request) {
        return request.user;
    }
}