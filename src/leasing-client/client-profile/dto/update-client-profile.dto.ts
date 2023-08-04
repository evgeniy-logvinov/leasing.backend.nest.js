import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsEnum, IsNotEmpty } from 'class-validator';
import { ClientStateEnum } from 'src/user/enum/ClientStateEnum';

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

  @ApiProperty({ enum: ClientStateEnum, enumName: 'ClientStateEnum' })
  @IsEnum(ClientStateEnum)
  @IsDefined()
  @IsNotEmpty()
  state: ClientStateEnum;
}
