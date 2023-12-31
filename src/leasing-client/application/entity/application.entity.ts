import { LeasingEntity } from 'src/entity/leasing-entity.entity';
import { LeasingClient } from 'src/leasing-client/entity/leasing-client.entity';
import { CommercialProposal } from 'src/leasing-company/commercial-proposal/entity/commercial-proposal.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { TypeOfLeasingSubjectEnum } from '../enum/TypeOfLeasingSubjectEnum';
import { TypeOfSupplierEnum } from '../enum/TypeOfSupplierEnum';

@Entity()
export class Application extends LeasingEntity {
  @Column()
  isNew: boolean;

  @Column({ nullable: true })
  returnable: boolean;

  @Column({
    type: 'enum',
    enum: TypeOfLeasingSubjectEnum,
  })
  subjectOfLeasing: TypeOfLeasingSubjectEnum;

  @Column()
  brand: string;

  @Column()
  model: string;

  @Column()
  country: string;

  // @Column({ type: 'timestamptz' })
  // releaseDate: Date;
  @Column({ type: 'date' })
  releaseDate: string;

  @Column({
    type: 'enum',
    enum: TypeOfSupplierEnum,
  })
  typeOfSupplier: string;

  @Column({ nullable: true })
  ndsPayer: boolean;

  @ManyToOne(() => LeasingClient, (item) => item.applications)
  client: LeasingClient;

  @OneToMany(() => CommercialProposal, (item) => item.application)
  commercialProposal: CommercialProposal[];
  // @CreateDateColumn()
  // created_at: Date; // Creation date
  // @UpdateDateColumn()
  // updated_at: Date; // Last updated date
  // @DeleteDateColumn()
  // deleted_at: Date; // Deletion date
}
