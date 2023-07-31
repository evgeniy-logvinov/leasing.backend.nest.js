import { MigrationInterface, QueryRunner } from 'typeorm';
import { ClientNames, LeasingClientsDescription } from './constants';
import { v4 as uuidv4 } from 'uuid';

interface LeasingClientSql {
  description: string;
  inviteId?: string;
  clientName: string;
}

export class FillLeasingClients1690829820713 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const clients: LeasingClientSql[] = [
      {
        description: 'Dumb client unreg 1',
        clientName: ClientNames.UNREG_1,
      },
      {
        description: 'Dumb client unreg 2',
        clientName: ClientNames.UNREG_2,
      },
      {
        description: LeasingClientsDescription.REG,
        clientName: ClientNames.REG,
      },
      {
        description: LeasingClientsDescription.REG_EMPTY,
        clientName: ClientNames.REG,
      },
      {
        description: 'Dumb client blocked',
        clientName: ClientNames.BLOCKED,
      },
      {
        description: 'Dumb client invited',
        clientName: ClientNames.INVITED,
        inviteId: uuidv4(),
      },
    ];

    clients.forEach((client) => {
      queryRunner.query(
        `INSERT INTO leasing_client (clientProfileId, description, inviteId, id)
                  SELECT id, '${client.description}', '${
          client.inviteId
        }', '${uuidv4()}'
                  FROM client_profile
                  WHERE client_profile.fullName = '${client.clientName}'`,
      );
    });
  }

  public async down(): Promise<void> {
    console.log('done');
  }
}
