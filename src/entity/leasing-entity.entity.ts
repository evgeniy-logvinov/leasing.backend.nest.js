import { PrimaryColumn } from 'typeorm';

export abstract class LeasingEntity {
  @PrimaryColumn('uuid')
  id: string;
}
