import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class ConfirmEmailDto {
  @ApiProperty({ description: 'User id' })
  @IsUUID()
  id: string;
}
