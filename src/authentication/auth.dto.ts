import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class RegisterDTO {
  @IsEmail()
  public email: string;
  @IsString()
  public username: string;
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'password contains at least an uppercase, a lowercase, a number and a symbol ',
  })
  public password: string;
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  public confirmPassword: string;
}

export class LoginDTO {
  @IsEmail()
  public email: string;
  @IsString()
  public password: string;
}
