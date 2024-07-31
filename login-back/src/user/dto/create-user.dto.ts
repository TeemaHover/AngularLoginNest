import { IsString, IsInt, IsEmail, Min, Max } from 'class-validator';

export class CreateUserDto {
  @IsString()
  readonly username: string;

  @IsString()
  readonly password: string;
}
