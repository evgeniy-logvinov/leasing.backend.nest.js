import { LeasingEntity } from 'src/entity/leasing-entity.entity';
import { Application } from 'src/leasing-client/application/entity/application.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class CommercialProposal extends LeasingEntity {
  @ManyToOne(() => Application, (item) => item.commercialProposal)
  application: Application;

  @Column()
  fullPrice: number;
}
