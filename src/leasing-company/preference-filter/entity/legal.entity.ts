import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Legal {
  @PrimaryGeneratedColumn()
  @Generated('increment')
  id: number;

  @Column({ default: true })
  hasLegalEntity: boolean;

  @Column({ default: true })
  hasOsn: boolean;

  @Column({ nullable: true })
  osnRegistrationPeriod: number;

  @Column({ default: true })
  hasUsn: boolean;

  @Column({ nullable: true })
  usnRegistrationPeriod: number;

  @Column({ default: true })
  hasEnvd: boolean;

  @Column({ nullable: true })
  envdRegistrationPeriod: number;

  @Column({ default: true })
  hasEchn: boolean;

  @Column({ nullable: true })
  echnRegistrationPeriod: number;

  @Column({ nullable: true })
  coastFromAtOne: number;

  @Column({ nullable: true })
  coastToAtOne: number;

  @Column({ nullable: true })
  maxAllSum: number;

  @Column({ default: true })
  hasRestrictions: boolean;

  @Column({ nullable: true })
  minAdvance: number;

  @Column({ nullable: true })
  maxPeriodOfFinancing: number;

  @Column({ default: true })
  forTaxi: boolean;
}
