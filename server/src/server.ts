import app from './app';
import dotenv from 'dotenv';
import config from './config/env';

dotenv.config();

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : config.port;

const HOST = process.env.HOST ?? '0.0.0.0';

if (process.env.NODE_ENV !== 'test' && (require.main === module)) {
  app.listen(PORT, HOST, () => {
    // eslint-disable-next-line no-console
    console.log(`Server is running on http://${HOST}:${PORT}`);
  });
}

export default app;
