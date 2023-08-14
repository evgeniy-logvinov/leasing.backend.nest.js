import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsEnum, IsNotEmpty } from 'class-validator';
import { CompanyStateEnum } from 'src/user/enum/CompanyStateEnum';

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

  @ApiProperty({ enum: CompanyStateEnum, enumName: 'CompanyStateEnum' })
  @IsEnum(CompanyStateEnum)
  @IsDefined()
  @IsNotEmpty()
  state: CompanyStateEnum;

  @ApiProperty()
  accreditation: boolean;

  @ApiProperty()
  agreement: boolean;
}
