import { ApiProperty } from '@nestjs/swagger';
import {
  MinLength,
  MaxLength,
  IsEmail,
  IsNotEmpty,
  Length,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ minimum: 4, maximum: 50 })
  @IsEmail()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(50)
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  // @Length(12)
  inn: string;
}
