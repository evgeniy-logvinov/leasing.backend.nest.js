import { MigrationInterface, QueryRunner } from 'typeorm';
import {
  ClientNames,
  LeasingClientsDescription,
  UserEmails,
} from './constants';
import { v4 as uuidv4 } from 'uuid';

interface LeasingClientSql {
  description: string;
  clientName: string;
  email: UserEmails;
}

export class FillLeasingClients1690829820713 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const clients: LeasingClientSql[] = [
      {
        description: 'Dumb client unreg 1',
        clientName: ClientNames.UNREG,
        email: UserEmails.CLIENT_EMPTY,
      },
      {
        description: LeasingClientsDescription.REG,
        clientName: ClientNames.REG_FILLED,
        email: UserEmails.CLIENT_FILLED,
      },
      {
        description: LeasingClientsDescription.REG_EMPTY,
        clientName: ClientNames.REG_EMPTY,
        email: UserEmails.CLIENT_EMPTY,
      },
      {
        description: 'Dumb client blocked',
        clientName: ClientNames.BLOCKED,
        email: UserEmails.CLIENT_BLOCKED,
      },
      {
        description: 'Dumb client invited',
        clientName: ClientNames.INVITED,
        email: UserEmails.CLIENT_INVITED,
      },
    ];

    clients.forEach((client) => {
      queryRunner.query(
        `INSERT INTO leasing_client (clientProfileId, description, userId, id)
                  SELECT client_profile.id, '${
                    client.description
                  }', user.id, '${uuidv4()}'
                  FROM client_profile, user
                  WHERE client_profile.fullName = '${
                    client.clientName
                  }' and user.email = '${client.email}'`,
      );
    });
  }

  public async down(): Promise<void> {
    console.log('done');
  }
}
