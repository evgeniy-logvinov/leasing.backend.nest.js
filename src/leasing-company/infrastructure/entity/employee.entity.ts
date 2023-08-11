import { LeasingEntity } from 'src/entity/leasing-entity.entity';
import { User } from 'src/user/entity/user.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

@Entity()
export class Employee extends LeasingEntity {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  patronymic: string;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @Column()
  phone: string;

  @Column()
  mobilePhone: string;

  @Column({ default: false })
  isOnline: boolean;
}
