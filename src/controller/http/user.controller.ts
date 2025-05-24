import { Controller, Post, Put, Delete, Body, Param, Get } from "@nestjs/common";
import { UserCreate, UserSave, UserDelete, getAllUser } from "src/application/user-create";
import { UserCreateDTO, UserUpdateDTO } from "./dto/user.dto";

@Controller('user')
export class UserController {
    constructor(
        private readonly createUser: UserCreate,
        private readonly saveUser: UserSave,
        private readonly deleteUser: UserDelete,
        private readonly getUser: getAllUser
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
}

