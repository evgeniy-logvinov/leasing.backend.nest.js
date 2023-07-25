import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailService {
  sendConfirmationEmail(userId: number, email: string): void {
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

  sendInviteEmail(inviteId: string, email: string): void {
    console.log(
      'invite link',
      email,
      `${process.env.BASE_URL_FE}${process.env.INVITE_CLIENT_PATH_FE}${inviteId}`,
    );
  }
}
