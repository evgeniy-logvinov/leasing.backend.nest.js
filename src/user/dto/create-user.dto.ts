import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  MinLength,
  MaxLength,
  Matches,
  IsEmail,
  IsNotEmpty,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ minimum: 4, maximum: 50 })
  @IsEmail()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(50)
  email: string;
}
