import { LeasingEntity } from 'src/entity/leasing-entity.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Employee extends LeasingEntity {
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
