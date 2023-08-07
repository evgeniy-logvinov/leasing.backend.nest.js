import { MigrationInterface, QueryRunner } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

interface LegalSql {
  id: string;
  coastFromAtOne: number;
  coastToAtOne: number;
  echnRegistrationPeriod: number;
  envdRegistrationPeriod: number;
  maxAllSum: number;
  maxPeriodOfFinancing: number;
  minAdvance: number;
  osnRegistrationPeriod: number;
  usnRegistrationPeriod: number;
  forTaxi: number;
  hasEchn: number;
  hasEnvd: number;
  hasLegalEntity: number;
  hasOsn: number;
  hasRestrictions: number;
  hasUsn: number;
}

export class FillLegal1691181903822 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const ips: LegalSql[] = [
      {
        id: uuidv4(),
        coastFromAtOne: 1000,
        coastToAtOne: 1001,
        echnRegistrationPeriod: 1002,
        envdRegistrationPeriod: 1003,
        maxAllSum: 1004,
        maxPeriodOfFinancing: 1005,
        minAdvance: 1006,
        osnRegistrationPeriod: 1007,
        usnRegistrationPeriod: 1009,
        forTaxi: 0,
        hasEchn: 0,
        hasEnvd: 0,
        hasLegalEntity: 0,
        hasOsn: 0,
        hasRestrictions: 0,
        hasUsn: 0,
      },
      {
        id: uuidv4(),
        coastFromAtOne: 2000,
        coastToAtOne: 2001,
        echnRegistrationPeriod: 2002,
        envdRegistrationPeriod: 2003,
        maxAllSum: 2004,
        maxPeriodOfFinancing: 2005,
        minAdvance: 2006,
        osnRegistrationPeriod: 2007,
        usnRegistrationPeriod: 2009,
        forTaxi: 1,
        hasEchn: 1,
        hasEnvd: 1,
        hasLegalEntity: 1,
        hasOsn: 1,
        hasRestrictions: 1,
        hasUsn: 1,
      },
      {
        id: uuidv4(),
        coastFromAtOne: 3000,
        coastToAtOne: 3001,
        echnRegistrationPeriod: 3002,
        envdRegistrationPeriod: 3003,
        maxAllSum: 3004,
        maxPeriodOfFinancing: 3005,
        minAdvance: 3006,
        osnRegistrationPeriod: 3007,
        usnRegistrationPeriod: 3009,
        forTaxi: 1,
        hasEchn: 1,
        hasEnvd: 1,
        hasLegalEntity: 1,
        hasOsn: 1,
        hasRestrictions: 1,
        hasUsn: 1,
      },
    ];
    ips.forEach((ip) => {
      queryRunner.query(
        `INSERT INTO legal (
          hasLegalEntity, 
          hasOsn, 
          osnRegistrationPeriod, 
          hasUsn, 
          usnRegistrationPeriod, 
          hasEnvd, 
          envdRegistrationPeriod, 
          hasEchn, 
          echnRegistrationPeriod, 
          coastFromAtOne, 
          coastToAtOne, 
          maxAllSum, 
          hasRestrictions, 
          minAdvance, 
          maxPeriodOfFinancing, 
          forTaxi, 
          id
          )
            VALUES(
                '${ip.hasLegalEntity}',
                '${ip.hasOsn}',
                '${ip.osnRegistrationPeriod}',
                '${ip.hasUsn}',
                '${ip.usnRegistrationPeriod}',
                '${ip.hasEnvd}',
                '${ip.envdRegistrationPeriod}',
                '${ip.hasEchn}',
                '${ip.echnRegistrationPeriod}',
                '${ip.coastFromAtOne}',
                '${ip.coastToAtOne}',
                '${ip.maxAllSum}',
                '${ip.hasRestrictions}',
                '${ip.minAdvance}',
                '${ip.maxPeriodOfFinancing}',
                '${ip.forTaxi}',
                '${ip.id}'
            )`,
      );
    });
  }

  public async down(): Promise<void> {
    console.log('down');
  }
}
