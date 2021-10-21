import dotenv from 'dotenv';
import cors from 'cors';
import express from 'express';
import ip from 'ip';
import { errorHandler, notFoundHandler } from './middlewares/app';
import { killPort, getCorsConfig, listenServer, runAsyncWrapper } from './libs/server';
import { getDataController, updateDataController } from './controllers/api/data';
import { homeController } from './controllers/home';

(async () => {
  try {
    dotenv.config();

    const PORT: string = parseInt(<string>process.env.PORT, 10) || 3005;
    const ipAddress = ip.address();
    const app = express();
    const corsConfig = getCorsConfig(ipAddress);

    await killPort(PORT);

    app.use(cors(corsConfig));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.get('/', runAsyncWrapper(homeController));
    app.get('/data/:name', runAsyncWrapper(getDataController));
    app.put('/data/:name', runAsyncWrapper(updateDataController));

    // Errors handling
    app.use(notFoundHandler);
    app.use(errorHandler);

    listenServer(app, PORT, () => {
      console.log(`Server listening at http://${ipAddress}:${PORT}`);
    });
  } catch (err) {
    console.error(err);
    process.exit();
  }
})();
