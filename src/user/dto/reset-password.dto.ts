import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  MinLength,
  MaxLength,
  Matches,
  IsNotEmpty,
} from 'class-validator';

export class ResetPasswordDto {
  @ApiProperty({
    minimum: 6,
    maximum: 20,
    description: 'At least 1 capital, 1 small, 1 special character & 1 number',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\w+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password too weak',
  })
  password: string;

  @ApiProperty({ description: 'Reset password UUID' })
  id: string;
}
