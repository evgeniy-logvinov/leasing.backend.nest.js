import { Permission } from 'src/user/permission/entity/permission.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RoleEnum } from '../../enum/RoleEnum';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  @Generated('increment')
  id: number;

  @Column({
    type: 'enum',
    enum: RoleEnum,
    default: RoleEnum.ROLE_ADMIN,
  })
  name: RoleEnum;

  @CreateDateColumn({ type: 'timestamp' })
  createdDate: Date;

  @CreateDateColumn({ type: 'timestamp' })
  updatedDate: Date;

  @ManyToMany(() => Permission, (permission) => permission.roles, {
    cascade: true,
  })
  @JoinTable()
  permissions: Permission[];
}
