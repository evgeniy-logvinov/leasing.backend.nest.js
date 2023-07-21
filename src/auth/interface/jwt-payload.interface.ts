import { PermissionEnum } from 'src/user/enum/PermissionEnum';
import { RoleEnum } from 'src/user/enum/RoleEnum';

export interface JwtPayload {
  email: string;
  role: RoleEnum;
  permissions: PermissionEnum[];
  confirmed: boolean;
}
