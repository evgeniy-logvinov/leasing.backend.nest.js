import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CompanyProfile {
  @PrimaryGeneratedColumn()
  @Generated('increment')
  id: number;

  @Column()
  fullName: string;

  @Column()
  shortName: string;
}
