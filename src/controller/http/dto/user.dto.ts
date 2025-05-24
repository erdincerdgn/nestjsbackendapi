import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class UserCreateDTO {
  
  user_email: string;
  user_password: string;
  user_fullname: string;
  user_age: number;
  user_countryinlive: string;


}

export class UserUpdateDTO {
  user_email: string;
  user_password: string;
  user_fullname: string;
  user_age: number;
  user_countryinlive: string;
}