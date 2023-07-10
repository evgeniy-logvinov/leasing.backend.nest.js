import { Application } from 'src/leasing-client/application/entity/application.entity';
import {
  Column,
  Entity,
  Generated,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class CommercialProposal {
  @PrimaryGeneratedColumn()
  @Generated('increment')
  id: number;

  @ManyToOne(() => Application, (item) => item.commercialProposal)
  application: Application;

  @Column()
  fullPrice: number;
}
