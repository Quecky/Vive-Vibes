import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { User } from '@/modules/user/domain/user.domain';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendWelcomeEmailNewUser(user: User) {
    const url = 'https://pi-equipo2-frontend.vercel.app/';
    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Bienvenido a Vive Vibes',
      template: '/welcome',
      context: {
        name: user.name,
        url,
      },
    });
  }
}
