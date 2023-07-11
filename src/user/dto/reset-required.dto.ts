import { ApiProperty } from '@nestjs/swagger';
import { MinLength, MaxLength, IsEmail, IsNotEmpty } from 'class-validator';

export class ResetRequiredDto {
  @ApiProperty({ minimum: 4, maximum: 50 })
  @IsEmail()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(50)
  email: string;
}
