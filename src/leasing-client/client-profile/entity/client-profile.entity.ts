import { LeasingEntity } from 'src/entity/leasing-entity.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class ClientProfile extends LeasingEntity {
  @Column()
  fullName: string;

  @Column({ nullable: true })
  shortName: string;

  @Column()
  inn: string;
}
