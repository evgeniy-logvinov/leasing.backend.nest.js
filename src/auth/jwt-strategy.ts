import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { User } from 'src/user/entity/user.entity';
import { UserService } from 'src/user/user.service';
import { JwtPayload } from './interface/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate({ email }: JwtPayload): Promise<User> {
    return await this.userService.findOneByEmail({ email });
  }
}
