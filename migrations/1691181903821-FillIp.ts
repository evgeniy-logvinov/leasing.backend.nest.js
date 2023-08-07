import { MigrationInterface, QueryRunner } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

interface IpSql {
  forTaxi: number;
  hasEchn: number;
  hasEnvd: number;
  hasIp: number;
  hasOsn: number;
  hasPsn: number;
  hasRestrictions: number;
  hasUsn: number;
  coastFromAtOne: number;
  id: string;
  coastToAtOne: number;
  echnRegistrationPeriod: number;
  envdRegistrationPeriod: number;
  maxAllSum: number;
  maxPeriodOfFinancing: number;
  minAdvance: number;
  osnRegistrationPeriod: number;
  psnRegistrationPeriod: number;
  usnRegistrationPeriod: number;
}

export class FillIp1691181903821 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const ips: IpSql[] = [
      {
        coastFromAtOne: 1000,
        id: uuidv4(),
        coastToAtOne: 1001,
        echnRegistrationPeriod: 1002,
        envdRegistrationPeriod: 1003,
        forTaxi: 1,
        hasEchn: 1,
        hasEnvd: 1,
        hasIp: 1,
        hasOsn: 1,
        hasPsn: 1,
        hasRestrictions: 1,
        hasUsn: 1,
        maxAllSum: 1004,
        maxPeriodOfFinancing: 1005,
        minAdvance: 1006,
        osnRegistrationPeriod: 1007,
        psnRegistrationPeriod: 1008,
        usnRegistrationPeriod: 1009,
      },
      {
        coastFromAtOne: 2000,
        id: uuidv4(),
        coastToAtOne: 2001,
        echnRegistrationPeriod: 2002,
        envdRegistrationPeriod: 2003,
        forTaxi: 1,
        hasEchn: 1,
        hasEnvd: 1,
        hasIp: 1,
        hasOsn: 1,
        hasPsn: 1,
        hasRestrictions: 1,
        hasUsn: 1,
        maxAllSum: 2004,
        maxPeriodOfFinancing: 2005,
        minAdvance: 2006,
        osnRegistrationPeriod: 2007,
        psnRegistrationPeriod: 2008,
        usnRegistrationPeriod: 2009,
      },
      {
        coastFromAtOne: 3000,
        id: uuidv4(),
        coastToAtOne: 3001,
        echnRegistrationPeriod: 3002,
        envdRegistrationPeriod: 3003,
        forTaxi: 0,
        hasEchn: 0,
        hasEnvd: 0,
        hasIp: 0,
        hasOsn: 0,
        hasPsn: 0,
        hasRestrictions: 0,
        hasUsn: 0,
        maxAllSum: 3004,
        maxPeriodOfFinancing: 3005,
        minAdvance: 3006,
        osnRegistrationPeriod: 3007,
        psnRegistrationPeriod: 3008,
        usnRegistrationPeriod: 3009,
      },
    ];
    ips.forEach((ip) => {
      queryRunner.query(
        `INSERT INTO ip (
            hasIp, 
            hasPsn, 
            psnRegistrationPeriod, 
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
            id)
            VALUES(
                '${ip.hasIp}',
                '${ip.hasPsn}',
                '${ip.psnRegistrationPeriod}',
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
