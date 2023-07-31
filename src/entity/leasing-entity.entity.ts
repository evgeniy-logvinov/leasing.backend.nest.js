import { PrimaryGeneratedColumn } from 'typeorm';

export abstract class LeasingEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
}
