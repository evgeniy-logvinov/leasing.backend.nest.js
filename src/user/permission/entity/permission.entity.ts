import { LeasingEntity } from 'src/entity/leasing-entity.entity';
import { PermissionEnum } from 'src/user/enum/PermissionEnum';
import { Role } from 'src/user/role/entity/role.entity';
import { Column, CreateDateColumn, Entity, ManyToMany } from 'typeorm';

@Entity()
export class Permission extends LeasingEntity {
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
