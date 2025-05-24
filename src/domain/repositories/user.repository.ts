import { User } from "../entities/user";

export abstract class IUserRepository {
    abstract save(user:User): Promise<User>;
    abstract findByEmail(user_email: string): Promise<User | null>;
    abstract findById(user_id: string): Promise<User | null>;
    abstract update(user:User): Promise<User>;
    abstract delete(user_id: string): Promise<void>;
    abstract getAllUser(): Promise<User[]>;
}