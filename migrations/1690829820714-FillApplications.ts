import { TypeOfLeasingSubjectEnum } from 'src/leasing-client/application/enum/TypeOfLeasingSubjectEnum';
import { TypeOfSupplierEnum } from 'src/leasing-client/application/enum/TypeOfSupplierEnum';
import { MigrationInterface, QueryRunner } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { LeasingClientsDescription } from './constants';

interface ApplicationSQL {
  isNew: number;
  returnable: number;
  subjectOfLeasing: TypeOfLeasingSubjectEnum;
  brand: string;
  model: string;
  country: string;
  releaseDate: string;
  typeOfSupplier: TypeOfSupplierEnum;
  ndsPayer: number;
  leasingClientDescription: LeasingClientsDescription;
}

export class FillApplications1690829820714 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const applications: ApplicationSQL[] = [
      {
        isNew: 1,
        returnable: 1,
        subjectOfLeasing: TypeOfLeasingSubjectEnum.CAR,
        brand: 'Skoda',
        model: 'Fabia',
        country: 'Чехия',
        releaseDate: '2012-01-01',
        typeOfSupplier: TypeOfSupplierEnum.OFFICIAL_DEALER,
        ndsPayer: 0,
        leasingClientDescription: LeasingClientsDescription.REG,
      },
      {
        isNew: 1,
        returnable: 1,
        subjectOfLeasing: TypeOfLeasingSubjectEnum.CAR,
        brand: 'Skoda',
        model: 'Rapid',
        country: 'Чехия',
        releaseDate: '2014-01-01',
        typeOfSupplier: TypeOfSupplierEnum.NON_OFFICIAL_DEALER,
        ndsPayer: 0,
        leasingClientDescription: LeasingClientsDescription.REG,
      },
      {
        isNew: 1,
        returnable: 1,
        subjectOfLeasing: TypeOfLeasingSubjectEnum.CAR,
        brand: 'Mitsubishi',
        model: 'Outlander',
        country: 'Япония',
        releaseDate: '2022-01-01',
        typeOfSupplier: TypeOfSupplierEnum.OWNER,
        ndsPayer: 0,
        leasingClientDescription: LeasingClientsDescription.REG,
      },
    ];
    applications.forEach((application) => {
      queryRunner.query(
        `INSERT INTO application (clientId, isNew, returnable, subjectOfLeasing, brand, model, country, releaseDate, typeOfSupplier, id)
                  SELECT id, '${application.isNew}', '${
          application.returnable
        }', '${application.subjectOfLeasing}', '${application.brand}', '${
          application.model
        }', '${application.country}', '${application.releaseDate}', '${
          application.typeOfSupplier
        }',  
        '${uuidv4()}'
                  FROM leasing_client
                  WHERE leasing_client.description = '${
                    application.leasingClientDescription
                  }'`,
      );
    });
  }

  public async down(): Promise<void> {
    console.log('done');
  }
}
