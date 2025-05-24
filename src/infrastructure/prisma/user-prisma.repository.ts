import { Injectable } from "@nestjs/common";
import { IUserRepository } from "src/domain/repositories/user.repository";
import { User } from "src/domain/entities/user";
import { PrismaService } from "./prisma.service";

@Injectable()
export class UserPrismaRepository implements IUserRepository {
    constructor(private prisma: PrismaService) {}
    async save(user: User): Promise<User> {
        const register = await this.prisma.user.create({
            data: {
                user_id: user.user_id,
                user_email: user.user_email,
                user_password: user.user_password,
                user_fullname: user.user_fullname,
                user_age: user.user_age,
                user_countryinlive: user.user_countryinlive
            }
        });
        return new User(register.user_id, register.user_email, register.user_password, register.user_fullname, register.user_age, register.user_countryinlive);
    }

    async findByEmail(user_email: string): Promise<User | null> {
        const data = await this.prisma.user.findUnique({ where: { user_email } });
        return data ? new User(data.user_id, data.user_email, data.user_password, data.user_fullname, data.user_age, data.user_countryinlive) : null;
    }
    async findById(user_id: string): Promise<User | null> {
        const data = await this.prisma.user.findUnique({ where: {user_id}});
        return data ? new User(data.user_id, data.user_email, data.user_password, data.user_fullname, data.user_age, data.user_countryinlive) : null;
    }

    async update(user: User): Promise<User> {
        const update = await this.prisma.user.update({
            where: { user_id: user.user_id},
            data: {
                user_email: user.user_email,
                user_password: user.user_password,
                user_fullname: user.user_fullname,
                user_age: user.user_age,
                user_countryinlive: user.user_countryinlive
            },
        });
        return new User(update.user_id, update.user_email, update.user_password, update.user_fullname, update.user_age, update.user_countryinlive);
    }

    async delete(user_id: string): Promise<void> {
        await this.prisma.user.delete({ where: { user_id }});
    }

    async getAllUser(): Promise<User[]> {
        const datas = await this.prisma.user.findMany();
        return datas.map(v => new User(v.user_id, v.user_email, v.user_password, v.user_fullname, v.user_age, v.user_countryinlive));
    }
}