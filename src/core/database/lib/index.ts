import { PrismaClient } from '@prisma/client';

import { env } from '@core/config/env';

export const prisma = new PrismaClient({
  log: env.NODE_ENV === 'dev' ? ['query'] : [],
});
