import { MigrationInterface, QueryRunner } from 'typeorm';
import { CompanyNames } from './constants';
import { v4 as uuidv4 } from 'uuid';

interface CompanyProfileSql {
  id: string;
  fullName: string;
  shortName: string;
  accreditation: number;
  agreement: string;
  inn: string;
}
// TODO: compare companies
export class FillCompanyProfile1692039106819 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const profiles: CompanyProfileSql[] = [
      {
        id: uuidv4(),
        fullName: CompanyNames.UNREG,
        shortName: 'DUDIS',
        inn: '1234567891',
        accreditation: 0,
        agreement: '/link',
      },
      {
        id: uuidv4(),
        fullName: CompanyNames.REG_FILLED,
        shortName: 'RUDIS',
        inn: '1234567892',
        accreditation: 1,
        agreement: '/link',
      },
      {
        id: uuidv4(),
        fullName: CompanyNames.REG_EMPTY,
        shortName: 'RUDIS',
        inn: '1234567892',
        accreditation: 1,
        agreement: '/link',
      },
      {
        id: uuidv4(),
        fullName: CompanyNames.BLOCKED,
        shortName: 'BUDIS',
        inn: '1234567893',
        accreditation: 0,
        agreement: '/link',
      },
      {
        id: uuidv4(),
        fullName: CompanyNames.INVITED,
        shortName: 'IUDIS',
        inn: '1234567894',
        accreditation: 0,
        agreement: '/link',
      },
    ];
    profiles.forEach((profile) => {
      queryRunner.query(
        `INSERT INTO company_profile (
              fullName,
              shortName,
              inn,
              accreditation,
              agreement,
              id
            )
            VALUES (
              '${profile.fullName}',
              '${profile.shortName}',
              '${profile.inn}',
              ${profile.accreditation},
              '${profile.agreement}',
              '${profile.id}'
            )`,
      );
    });
  }

  public async down(): Promise<void> {
    console.log('done');
  }
}
