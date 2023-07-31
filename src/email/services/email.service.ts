import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailService {
  sendConfirmationEmail(userId: string, email: string): void {
    console.log(
      'confirmation link',
      email,
      `${process.env.BASE_URL_FE}${process.env.CONFIRM_PATH_FE}${userId}`,
    );
  }

  sendResetEmail(resetId: string, email: string): void {
    console.log(
      'reset link',
      email,
      `${process.env.BASE_URL_FE}${process.env.RESET_PASSWORD_PATH_FE}${resetId}`,
    );
  }
}
