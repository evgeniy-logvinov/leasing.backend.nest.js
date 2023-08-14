import { MigrationInterface, QueryRunner } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import {
  CompanyNames,
  LeasingCompanyDescription,
  UserEmails,
} from './constants';

interface LeasingCompanySql {
  description: string;
  inviteId?: string;
  companyName: string;
  email: UserEmails;
}

export class FillLeasingCompany1692039658769 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const companies: LeasingCompanySql[] = [
      //   {
      //     description: 'Dumb client unreg 1',
      //     companyName: CompanyNames.UNREG,
      //     email: UserEmails.COMPANY_EMPTY,
      //   },
      {
        description: LeasingCompanyDescription.REG,
        companyName: CompanyNames.REG_FILLED,
        email: UserEmails.CLIENT_FILLED,
        inviteId: uuidv4(),
      },
      //   {
      //     description: LeasingCompanyDescription.REG_EMPTY,
      //     companyName: CompanyNames.REG_EMPTY,
      //     email: UserEmails.CLIENT_EMPTY,
      //   },
      //   {
      //     description: 'Dumb client blocked',
      //     companyName: CompanyNames.BLOCKED,
      //     email: UserEmails.CLIENT_BLOCKED,
      //   },
      //   {
      //     description: 'Dumb client invited',
      //     companyName: CompanyNames.INVITED,
      //     inviteId: uuidv4(),
      //     email: UserEmails.CLIENT_INVITED,
      //   },
    ];

    companies.forEach((company) => {
      queryRunner.query(
        `INSERT INTO leasing_company (
            companyProfileId,
            description,
            inviteId,
            userId,
            infrastructureId,
            preferenceFilterId,
            id
        )
        SELECT company_profile.id,
            '${company.description}',
            '${company.inviteId}',
            user.id,
            infrastructure.id,
            preference_filter.id,
            '${uuidv4()}'
        FROM company_profile, user, infrastructure, preference_filter
        WHERE company_profile.fullName = '${company.companyName}'
        AND user.email = '${company.email}'
        LIMIT 1;`,
      );
    });
  }

  public async down(): Promise<void> {
    console.log('done');
  }
}
