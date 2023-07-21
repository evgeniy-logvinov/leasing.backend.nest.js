import { Post, Body, ValidationPipe, Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateAdminDto } from 'src/user/dto/create-admin.dto';
import { ResetPasswordDto } from 'src/user/dto/reset-password.dto';
import { ResetRequiredDto } from 'src/user/dto/reset-required.dto';
import { SignInCredentialsDto } from 'src/user/dto/signin-credentials.dto';
import { JwtPayload } from './interface/jwt-payload.interface';
import { AuthService } from './service/auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(
    @Body(ValidationPipe) signupCredentialsDto: CreateAdminDto,
  ): Promise<{ message: string }> {
    console.log('signupCredentialsDto', signupCredentialsDto);
    return this.authService.signUp(signupCredentialsDto);
  }

  @Post('/reset-required')
  resetPequired(
    @Body(ValidationPipe) resetRequiredDto: ResetRequiredDto,
  ): Promise<{ message: string }> {
    console.log('resetRequiredDto', resetRequiredDto);
    return this.authService.resetRequired(resetRequiredDto);
  }

  @Post('/reset-password')
  resetPassword(
    @Body(ValidationPipe) resetPasswordDto: ResetPasswordDto,
  ): Promise<{ message: string }> {
    console.log('resetPasswordDto', resetPasswordDto);
    return this.authService.resetPassword(resetPasswordDto);
  }

  @Post('/confirm-email')
  confirmEmail(
    @Body(ValidationPipe) { id }: { id: string },
  ): Promise<{ message: string }> {
    console.log('confirmEmailDto', id);
    return this.authService.confirmEmail(id);
  }

  @Post('/send-confirm-email')
  sendConfirmEmail(
    @Body(ValidationPipe) { email }: { email: string },
  ): Promise<{ message: string }> {
    console.log('email', email);
    return this.authService.sendConfirmEmail(email);
  }

  @Post('/login')
  signIn(
    @Body(ValidationPipe) signinCredentialsDto: SignInCredentialsDto,
  ): Promise<{ accessToken: string; user: JwtPayload }> {
    console.log('signinCredentialsDto', signinCredentialsDto);
    return this.authService.logIn(signinCredentialsDto);
  }
}
