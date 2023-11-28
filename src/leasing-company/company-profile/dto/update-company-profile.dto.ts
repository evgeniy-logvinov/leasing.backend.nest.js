import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateCompanyProfileDto {
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

  @ApiProperty()
  accreditation: boolean;

  @ApiProperty()
  agreement: boolean;
}
