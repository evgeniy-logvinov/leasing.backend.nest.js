import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleEnum } from 'src/user/enum/RoleEnum';
import { Repository } from 'typeorm';
import { Role } from './entity/role.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

  async getRole(name: RoleEnum): Promise<Role> {
    const role = await this.roleRepository.findOne({ where: { name } });

    if (!role) {
      throw new NotFoundException(`This ROLE_ADMIN is not found`);
    }

    return role;
  }
}
