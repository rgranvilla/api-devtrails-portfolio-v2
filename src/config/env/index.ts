import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
  API_BASE_URL: z.string().default('http://localhost'),
  JWT_SECRET: z.string(),
  PORT: z.coerce.number().default(3333),
  POSTGRES_DATABASE: z.string(),
  POSTGRES_USER: z.string(),
  POSTGRES_PASSWORD: z.string(),
  POSTGRES_PORTS: z.coerce.number().default(5432),
  DATABASE_URL: z.string(),
  MAIL_PROVIDER: z.string(),
  FORGOT_MAIL_URL: z.string(),
  AWS_REGION: z.string(),
  STORAGE_PROVIDER: z.string(),
});

const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
  console.error('❌ Invalid environment variables', _env.error.format());

  throw new Error('Invalid environment variables.');
}

export const env = _env.data;
