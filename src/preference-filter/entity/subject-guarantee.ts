import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class SubjectGuarantee {
  @PrimaryGeneratedColumn()
  @Generated('increment')
  id: number;

  @Column()
  yes: boolean;

  @Column()
  affilatedCompanies: boolean;

  @Column()
  anySubject: boolean;
}
