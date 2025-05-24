import { Injectable } from '@nestjs/common';
import { IUserRepository } from 'src/domain/repositories/user.repository';
import { User } from 'src/domain/entities/user';

@Injectable()
export class UserCreate {
    constructor(private readonly repo: IUserRepository) {}

    async Run(input: { user_email: string; user_password: string; user_fullname: string; user_age: number; user_countryinlive: string}) {
        return await this.repo.save(
          new User(undefined as unknown as string, input.user_email, input.user_password, input.user_fullname, input.user_age, input.user_countryinlive)
        );
    }
}

@Injectable()
export class UserSave {
    constructor(private readonly repo: IUserRepository) {}

    async Run(user_id: string, input: {user_email: string; user_password: string; user_fullname: string; user_age: number; user_countryinlive: string}) {
        const exist = await this.repo.findById(user_id);
        if (!exist) throw new Error('User not found.');
        const updated = new User(user_id, input.user_email, input.user_password, input.user_fullname, input.user_age, input.user_countryinlive);
        return await this.repo.update(updated);
    }
}

@Injectable()
export class UserDelete {
  constructor(private readonly repo: IUserRepository) {}

  async Run(user_id: string) {
    const exist = await this.repo.findById(user_id);
    if (!exist) throw new Error('User not found.');
    await this.repo.delete(user_id);
  }
}

@Injectable()
export class getAllUser {
  constructor (private readonly repo: IUserRepository) {}

  async Run() {
    return await this.repo.getAllUser();
  }
}