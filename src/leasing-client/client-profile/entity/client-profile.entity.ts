import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ClientProfile {
  @PrimaryGeneratedColumn()
  @Generated('increment')
  id: number;

  @Column()
  fullName: string;

  @Column()
  shortName: string;
}
