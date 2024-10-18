import { Type } from 'class-transformer';
import { IsNumber, IsString, ValidateNested } from 'class-validator';

export class AboutDTO {
  @IsString()
  public imageUrl: string;
  @IsString()
  public gender: Gender;
  @IsString()
  public birthday: string;
  @IsString()
  public horoscope: string;
  @IsString()
  public zodiac: string;
  @IsNumber()
  public height: string;
  @IsNumber()
  public weight: string;
}

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}

export class ProfileDTO {
  @IsString()
  public username: string;
  @Type(() => AboutDTO)
  @ValidateNested()
  public about: AboutDTO;
  @IsString()
  public interest: string;
}
