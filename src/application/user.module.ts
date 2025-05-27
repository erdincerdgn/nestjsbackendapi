import { Module } from '@nestjs/common';
import { UserController } from 'src/controller/http/user.controller';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { getAllUser, getOneUser, UserCreate, UserDelete, UserSave } from './user-create';
import { IUserRepository } from 'src/domain/repositories/user.repository';
import { UserPrismaRepository } from 'src/infrastructure/prisma/user-prisma.repository';

@Module({
    providers: [
        PrismaService,
        UserCreate,
        UserSave,
        UserDelete,
        getAllUser,
        getOneUser,
        {
            provide: IUserRepository,
            useClass: UserPrismaRepository
        }
    ],
    controllers: [UserController],
    imports: []
})
export class UserModule {}