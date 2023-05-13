import { registerAs } from '@nestjs/config';

export default registerAs('email', () => ({
  MAILGUN_API_KEY: process.env.MAILGUN_API_KEY,
  MAILGUN_DOMAIN_NAME: process.env.MAILGUN_DOMAIN_NAME,
  MAILGUN_TEMPLATE_NAME_FOR_VERIFY_EMAIL:
    process.env.MAILGUN_TEMPLATE_NAME_FOR_VERIFY_EMAIL,
}));
