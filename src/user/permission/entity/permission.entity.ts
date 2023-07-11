import { PermissionEnum } from 'src/user/enum/PermissionEnum';
import { Role } from 'src/user/role/entity/role.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Permission {
  @PrimaryGeneratedColumn()
  @Generated('increment')
  id: number;

  @Column({
    type: 'enum',
    enum: PermissionEnum,
    default: PermissionEnum.EMPLOYEES,
  })
  name: PermissionEnum;

  @CreateDateColumn({ type: 'timestamp' })
  createdDate: Date;

  @CreateDateColumn({ type: 'timestamp' })
  updatedDate: Date;

  @ManyToMany(() => Role, (roles) => roles.permissions)
  roles: Role[];
}
