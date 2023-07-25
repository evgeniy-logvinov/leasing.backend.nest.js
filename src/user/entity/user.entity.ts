import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';
import { Role } from '../role/entity/role.entity';

@Entity()
@Unique(['email'])
export class User {
  @PrimaryGeneratedColumn()
  @Generated('increment')
  id: number;

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

  @ManyToOne(() => Role, (role) => role.id, {
    // eager: true,
  })
  // TODO: Change to roleId
  @JoinColumn({ name: 'role_id' })
  role: Role;

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}
