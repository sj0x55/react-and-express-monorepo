import terminus from '@godaddy/terminus';
import http, { RequestListener } from 'http';
import { CorsOptions } from 'cors';
import kill from 'kill-port';
import { NextFunction, Request, Response } from 'express';
import { HttpMethod, NodeEnv } from '@package/enums';

export async function killPort(port: number) {
  if (process.env.NODE_ENV === NodeEnv.DEV) {
    try {
      await kill(port); // After re-run the server during the watch mode the port may be busy.
    } catch (err) {
      console.error(err);
    }
  }
}

export function getCorsConfig(ipAddress: string): CorsOptions {
  return {
    origin: (requestOrigin, callback) => {
      const regExp = new RegExp(`(http|https)://(localhost|127.0.0.1|${ipAddress})`);

      if (requestOrigin && regExp.test(requestOrigin)) {
        callback(null, [requestOrigin]);
      }
    },
    methods: [HttpMethod.GET, HttpMethod.POST, HttpMethod.PUT, HttpMethod.OPTIONS],
  };
}

export async function listenServer(app: RequestListener, port: number, callback: () => void) {
  const server = http.createServer(app);
  const onSignal = async () => {
    console.log('Server is starting cleanup');
  };
  const onShutdown = async () => {
    console.log('Cleanup finished, server is shutting down');
  };

  terminus.createTerminus(server, { signal: 'SIGINT', onSignal, onShutdown, logger: console.error });
  server.listen(port, '0.0.0.0', callback);
}

export type AsyncRequestHandler = (req: Request, res: Response, next: NextFunction) => Promise<void>;
export const runAsyncWrapper = (handler: AsyncRequestHandler) => handler;
