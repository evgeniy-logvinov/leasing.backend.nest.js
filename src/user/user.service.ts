import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtPayload } from 'src/auth/interface/jwt-payload.interface';
import { CreateAdminDto } from './dto/create-admin.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { ResetRequiredDto } from './dto/reset-required.dto';
import { SignInCredentialsDto } from './dto/signin-credentials.dto';
import { User } from './entity/user.entity';
import { RoleEnum } from './enum/RoleEnum';
import { RoleService } from './role/role.service';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { Repository } from 'typeorm';
import { Role } from './role/entity/role.entity';
import { Permission } from './permission/entity/permission.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
    @InjectRepository(Permission)
    private permissionRepository: Repository<Permission>,
    private roleService: RoleService,
  ) {}

  async createAdmin(
    adminDto: CreateAdminDto,
  ): Promise<{ message: string; id: number }> {
    const role = await this.roleService.getRole(RoleEnum.ROLE_ADMIN);
    const { email, password } = adminDto;
    console.log('admin', email, password);
    try {
      const user = new User();
      user.email = email;
      user.salt = await bcrypt.genSalt();
      user.password = await this.hashPassword(password, user.salt);
      user.role = role;

      await this.userRepository.save(user);

      return { message: 'User successfully created !', id: user.id };
    } catch (error) {
      // For postgresql
      if (error.code === '23505') {
        throw new ConflictException('Email already exists');
      }
      // For mysql
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('Email already exists');
      }

      throw new InternalServerErrorException();
    }
  }

  async createClient(
    userDto: CreateUserDto,
  ): Promise<{ message: string; user: User }> {
    const role = await this.roleService.getRole(RoleEnum.ROLE_LEASING_CLIENT);
    const { email } = userDto;

    try {
      const user = new User();
      user.email = email;
      user.role = role;

      await this.userRepository.save(user);

      return { message: 'User successfully created !', user };
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Email already exists');
      }

      throw new InternalServerErrorException();
    }
  }

  async createCompany(
    userDto: CreateUserDto,
  ): Promise<{ message: string; user: User }> {
    const role = await this.roleService.getRole(RoleEnum.ROLE_LEASING_COMPANY);
    const { email } = userDto;

    try {
      const user = new User();
      user.email = email;
      user.role = role;

      await this.userRepository.save(user);

      return { message: 'User successfully created !', user };
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Email already exists');
      }

      throw new InternalServerErrorException();
    }
  }

  async resetPassword(
    resetPasswordDto: ResetPasswordDto,
  ): Promise<{ message: string }> {
    const { password, id } = resetPasswordDto;

    const user = await this.userRepository.findOne({
      where: { resetPasswordId: id },
    });

    if (!user) {
      throw new NotFoundException(`User don't ask reset the password`);
    }

    try {
      user.salt = await bcrypt.genSalt();
      user.password = await this.hashPassword(password, user.salt);
      user.resetPasswordId = null;
      await this.userRepository.save(user);

      return { message: 'Password reset!' };
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async resetRequired(
    resetRequiredDto: ResetRequiredDto,
  ): Promise<{ message: string; resetId: string }> {
    const { email } = resetRequiredDto;
    const user = await this.userRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new ConflictException(`This email: ${email} is not found.`);
    }

    try {
      user.resetPasswordId = uuidv4();

      await this.userRepository.save(user);

      return { message: 'Email send!', resetId: user.resetPasswordId };
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async changeConfirmEmail(id: string): Promise<{ message: string }> {
    const user = await this.userRepository.findOne({
      // TODO: change this part
      where: { id: Number(id) },
    });

    if (!user) {
      throw new NotFoundException(`This user ${id} not exists`);
    }

    if (user.isEmailConfirmed) {
      // TODO: Show message if already confirmed
      return { message: 'Email already confirmed!' };
    }

    try {
      user.isEmailConfirmed = true;

      await this.userRepository.save(user);

      return { message: 'Email confirmed!' };
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async validateUserPassword(
    signInCredentialsDto: SignInCredentialsDto,
  ): Promise<JwtPayload> {
    const { email, password } = signInCredentialsDto;
    const auth = await this.userRepository.findOne({
      where: { email },
      relations: {
        role: { permissions: true },
      },
    });
    if (auth && (await auth.validatePassword(password))) {
      return {
        email: auth.email,
        role: auth.role.name,
        permissions: auth.role?.permissions?.map((perm) => perm.name),
        confirmed: auth.isEmailConfirmed,
      };
    } else {
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  async findOneByEmail({ email }: { email: string }): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new NotFoundException(`This user ${email} is not found`);
    }
    return user;
  }

  async findOneById({ id }: { id: number }): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(`This user ${id} is not found`);
    }
    return user;
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }

  getAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  getAllRole(): Promise<Role[]> {
    return this.roleRepository.find();
  }

  getAllPermissions(): Promise<Permission[]> {
    return this.permissionRepository.find();
  }
}
