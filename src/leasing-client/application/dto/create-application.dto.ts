import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsDateString, IsEnum, IsDefined } from 'class-validator';
import { TypeOfLeasingSubjectEnum } from '../enum/TypeOfLeasingSubjectEnum';
import { TypeOfSupplierEnum } from '../enum/TypeOfSupplierEnum';

export class CreateApplicationDto {
  @ApiProperty()
  @IsNotEmpty()
  isNew: boolean;

  @ApiProperty()
  @IsNotEmpty()
  returnable: boolean;

  @ApiProperty()
  @IsNotEmpty()
  ndsPayer: boolean;

  @ApiProperty()
  @IsNotEmpty()
  brand: string;

  @ApiProperty()
  @IsNotEmpty()
  country: string;

  @ApiProperty()
  @IsNotEmpty()
  model: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  releaseDate: string;

  @ApiProperty({
    enum: TypeOfLeasingSubjectEnum,
    enumName: 'TypeOfLeasingSubjectEnum',
  })
  @IsEnum(TypeOfLeasingSubjectEnum)
  @IsDefined()
  @IsNotEmpty()
  subjectOfLeasing: TypeOfLeasingSubjectEnum;

  @ApiProperty({ enum: TypeOfSupplierEnum, enumName: 'TypeOfCommitmentEnum' })
  @IsEnum(TypeOfSupplierEnum)
  @IsDefined()
  @IsNotEmpty()
  typeOfSupplier: TypeOfSupplierEnum;
}
