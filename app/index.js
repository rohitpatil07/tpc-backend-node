import config from './config/index.js';
import routes from './routes/index.js';
import logger from './util/logger.js';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import expressWinston from 'express-winston';
import winston from 'winston';
import fileUpload from 'express-fileupload';

const PORT = config.PORT || 3000;

const startServer = () => {
  const app = express();

  app.use(helmet());

  app.use(fileUpload());
  app.use(
    cors({
      origin: config.CORS_ORIGIN,
      methods: ['GET', 'POST'],
      credentials: true,
    }),
  );

  if (config.NODE_ENV != 'test') {
    app.use(
      expressWinston.logger({
        meta: false,
        transports: [new winston.transports.Console()],
        expressFormat: true,
      }),
    );
  }
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use('/', routes);

  app.get('/', (req, res) => {
    return res.json({ message: 'Hello World' });
  });

  app.listen(PORT, () =>
    logger.info(`Server running on port ${PORT} in ${config.NODE_ENV} mode`),
  );

  return app;
};

export { startServer };
