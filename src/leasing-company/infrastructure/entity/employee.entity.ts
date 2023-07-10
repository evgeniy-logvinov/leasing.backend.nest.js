import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  @Generated('increment')
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  patronymic: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  mobilePhone: string;

  @Column({ default: false })
  isOnline: boolean;
}
