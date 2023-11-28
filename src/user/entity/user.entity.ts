import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  Unique,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';
import { Role } from '../role/entity/role.entity';
import { LeasingEntity } from 'src/entity/leasing-entity.entity';
import { UserStateEnum } from '../enum/UserStateEnum';

@Entity()
@Unique(['email'])
export class User extends LeasingEntity {
  @Column({ type: 'varchar' })
  email: string;

  @Column({ type: 'varchar', nullable: true })
  @Exclude({ toPlainOnly: true })
  password: string;

  @Column({ nullable: true, select: false })
  resetPasswordId: string;

  @Column({ default: false })
  isEmailConfirmed: boolean;

  @Column({ nullable: true })
  @Exclude({ toPlainOnly: true })
  salt: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdDate: Date;

  @CreateDateColumn({ type: 'timestamp' })
  updatedDate: Date;

  @ManyToOne(() => Role, (role) => role.id)
  @JoinColumn()
  role: Role;

  @Column({ nullable: true, select: false })
  inviteId: string;

  @Column({
    type: 'enum',
    enum: UserStateEnum,
    default: UserStateEnum.UNREG,
  })
  state: UserStateEnum;

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}
