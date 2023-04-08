import { env } from '@config/env';

export const auth = {
  secret_token: env.JWT_SECRET,
  expires_in_token: '15m',
  expires_in_refresh_token: '30d',
  expires_refresh_token_days: 30,
};
