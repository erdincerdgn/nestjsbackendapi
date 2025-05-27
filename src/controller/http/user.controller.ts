import { Controller, Post, Put, Delete, Body, Param, Get, UseGuards, Req, UnauthorizedException } from "@nestjs/common";
import { UserCreate, UserSave, UserDelete, getAllUser, getOneUser } from "src/application/user-create";
import { UserCreateDTO, UserUpdateDTO } from "./dto/user.dto";
import { PassportJwtAuthGuard } from "src/infrastructure/auth/guards/passport-jwt.guard";
import { AuthGuard } from "src/infrastructure/auth/guards/auth.guard";


@Controller('user')
export class UserController {
    constructor(
        private readonly createUser: UserCreate,
        private readonly saveUser: UserSave,
        private readonly deleteUser: UserDelete,
        private readonly getUser: getAllUser,
        private readonly getOneUser: getOneUser
    ) {}

    @Post()
    async create(@Body() dto: UserCreateDTO) {
        return this.createUser.Run(dto);
    }

    @Put(':id')
        async update(@Param('id') id: string, @Body() dto: UserUpdateDTO) {
        return this.saveUser.Run(id,dto);
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        await this.deleteUser.Run(id);
        return { message: 'Kullanıcı silindi.'};
    }

    @Get()
    async get() {
        return this.getUser.Run();
    }

    @UseGuards(PassportJwtAuthGuard)
    @Get('me')
    async getProfile(@Req() req: any) {
        
        const user_id = req.user?.user_id; // JWT payload içindeki user_id
        console.log('REQ USER:', req.user);
        if (!user_id) {
            throw new UnauthorizedException('User ID not found in token');
        }
        const user = await this.getOneUser.Run(user_id);
        return user;
    }

}

