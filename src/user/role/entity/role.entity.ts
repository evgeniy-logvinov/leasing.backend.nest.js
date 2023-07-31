import { LeasingEntity } from 'src/entity/leasing-entity.entity';
import { Permission } from 'src/user/permission/entity/permission.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
} from 'typeorm';
import { RoleEnum } from '../../enum/RoleEnum';

@Entity()
export class Role extends LeasingEntity {
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
