import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { EmailVar } from './mail.interface';
import axios from 'axios';
import * as FormData from 'form-data';
import emailConfig from 'src/config/emailConfig';

@Injectable()
export class MailService {
  constructor(
    @Inject(emailConfig.KEY) readonly config: ConfigType<typeof emailConfig>,
  ) {}

  async sendEmail(
    to: string,
    subject: string,
    template: string,
    emailVars: EmailVar[],
  ) {
    const form = new FormData();
    form.append('from', `Likelion <mail@mail.com>`);
    form.append('to', to);
    form.append('subject', subject);
    form.append('template', template);
    emailVars.forEach((eVar) => form.append(`v:${eVar.key}`, eVar.value));

    try {
      await axios.post(
        `https://api.mailgun.net/v3/${this.config.MAILGUN_DOMAIN_NAME}/messages`,
        form,
        {
          auth: {
            username: 'api',
            password: this.config.MAILGUN_API_KEY,
          },
        },
      );
      return true;
    } catch (e) {
      return false;
    }
  }

  async sendVerificationEmail(email: string, name: string, code: string) {
    await this.sendEmail(
      email,
      'Verify Your Email',
      this.config.MAILGUN_TEMPLATE_NAME_FOR_VERIFY_EMAIL,
      [
        { key: 'code', value: code },
        { key: 'username', value: name },
      ],
    );
  }
}
