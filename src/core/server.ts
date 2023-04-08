import { app } from '@app';
import { env } from '@config/env';

app
  .listen({
    host: '0.0.0.0',
    port: env.PORT,
  })
  .then(() => {
    console.info(`🚀 HTTP Server Running on ${env.API_BASE_URL}:${env.PORT}`);
  })
  .catch((err: unknown) => {
    console.error(err);
    process.exit(1);
  });
