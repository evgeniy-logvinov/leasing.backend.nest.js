import { ClientProfile } from 'src/leasing-client/client-profile/entity/client-profile.entity';
import { ClientStateEnum } from 'src/user/enum/ClientStateEnum';
import { MigrationInterface, QueryRunner } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { ClientNames } from './constants';

export class FillClientProfiles1690829820712 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const profiles: ClientProfile[] = [
      {
        id: uuidv4(),
        fullName: ClientNames.UNREG_1,
        shortName: 'DUDIS',
        inn: '1234567891',
        state: ClientStateEnum.UNREG,
      },
      {
        id: uuidv4(),
        fullName: ClientNames.UNREG_2,
        shortName: 'UUDIS',
        inn: '1234567890',
        state: ClientStateEnum.UNREG,
      },
      {
        id: uuidv4(),
        fullName: ClientNames.REG,
        shortName: 'RUDIS',
        inn: '1234567892',
        state: ClientStateEnum.REG,
      },
      {
        id: uuidv4(),
        fullName: ClientNames.BLOCKED,
        shortName: 'BUDIS',
        inn: '1234567893',
        state: ClientStateEnum.BLOCKED,
      },
      {
        id: uuidv4(),
        fullName: ClientNames.INVITED,
        shortName: 'IUDIS',
        inn: '1234567894',
        state: ClientStateEnum.INVITED,
      },
    ];
    profiles.forEach((profile) => {
      queryRunner.query(
        `INSERT INTO client_profile (fullName, shortName, inn, state, id)
          VALUES ('${profile.fullName}', '${profile.shortName}', '${profile.inn}','${profile.state}','${profile.id}')`,
      );
    });
  }

  public async down(): Promise<void> {
    console.log('done');
  }
}
