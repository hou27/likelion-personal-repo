import * as Joi from 'joi';

export const validationSchema = Joi.object({
  MAILGUN_API_KEY: Joi.string().required(),
  MAILGUN_DOMAIN_NAME: Joi.string().required(),
  MAILGUN_TEMPLATE_NAME_FOR_VERIFY_EMAIL: Joi.string().required(),
});
