import { ClientProfile } from 'src/leasing-client/client-profile/entity/client-profile.entity';
import { MigrationInterface, QueryRunner } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { ClientNames } from './constants';

export class FillClientProfiles1690829820712 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const profiles: ClientProfile[] = [
      {
        id: uuidv4(),
        fullName: ClientNames.UNREG,
        shortName: 'DUDIS',
        inn: '1234567891',
      },
      {
        id: uuidv4(),
        fullName: ClientNames.REG_FILLED,
        shortName: 'RUDIS',
        inn: '1234567892',
      },
      {
        id: uuidv4(),
        fullName: ClientNames.BLOCKED,
        shortName: 'BUDIS',
        inn: '1234567893',
      },
      {
        id: uuidv4(),
        fullName: ClientNames.INVITED,
        shortName: 'IUDIS',
        inn: '1234567894',
      },
    ];
    profiles.forEach((profile) => {
      queryRunner.query(
        `INSERT INTO client_profile (fullName, shortName, inn, id)
          VALUES ('${profile.fullName}', '${profile.shortName}', '${profile.inn}','${profile.id}')`,
      );
    });
  }

  public async down(): Promise<void> {
    console.log('done');
  }
}
