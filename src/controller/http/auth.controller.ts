import { Body, Controller, Get, HttpCode, HttpStatus, NotImplementedException, Post, Request, UseGuards } from "@nestjs/common";
import { AuthService } from "src/infrastructure/auth/auth.service";
import { AuthGuard } from "src/infrastructure/auth/guards/auth.guard";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}


    @HttpCode(HttpStatus.OK)
    @Post('login')
    login(@Body() input: { user_email: string; user_password: string}) {
        return this.authService.authenticate(input);
    }

    @UseGuards(AuthGuard)
    @Get('me')
    getUserInfo(@Request() request) {
        return request.user;
    }
}