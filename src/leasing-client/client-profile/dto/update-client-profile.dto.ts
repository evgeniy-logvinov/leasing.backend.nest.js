import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateClientProfileDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  @IsNotEmpty()
  fullName: string;

  @ApiProperty()
  shortName: string;

  @ApiProperty()
  @IsNotEmpty()
  inn: string;
}
