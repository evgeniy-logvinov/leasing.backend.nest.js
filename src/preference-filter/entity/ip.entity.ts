import {
  Column,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { City } from './city.entity';
import { SubCompany } from './sub-company.entity';

@Entity()
export class Ip {
  @PrimaryGeneratedColumn()
  @Generated('increment')
  id: number;

  @Column()
  gk: boolean;

  @ManyToOne(() => SubCompany)
  @JoinColumn()
  subCompanies: SubCompany;

  //   private Boolean hasPsn;

  //   private Number psnRegistrationPeriod;

  //   private Boolean hasIp;

  //   private Boolean hasOsn;
  //   private Number osnRegistrationPeriod;
  //   private Boolean hasUsn;
  //   private Number usnRegistrationPeriod;
  //   private Boolean hasEnvd;
  //   private Number envdRegistrationPeriod;
  //   private Boolean hasEchn;
  //   private Number echnRegistrationPeriod;

  //   private Number coastFromAtOne;
  //   private Number coastToAtOne;
  //   private Number maxAllSum;
  //   private Boolean hasRestrictions;
  //   private Number minAdvance;
  //   private Number maxPeriodOfFinancing;
  //   private Boolean forTaxi;
}
