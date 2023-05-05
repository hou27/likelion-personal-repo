import * as Joi from 'joi';

export const validationSchema = Joi.object({
  AUTH_ENV: Joi.string().required(),
  DB_ENV: Joi.string().required(),
});
