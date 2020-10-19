import { fastify, FastifyInstance } from 'fastify';
import cors from 'fastify-cors';
import helmet from 'fastify-helmet';
// import underPressure from 'under-pressure';
import fs from 'fs';

export default class Server {
  readonly port: number;

  public fastify: FastifyInstance;

  constructor(port: number = 0) {
    this.port = port;
    this.fastify = fastify({ logger: true });
  }

  public async setup(): Promise<boolean> {
    await this.setupPlugins();
    await this.setupRoutes();
    return true;
  }

  private async setupPlugins(): Promise<void> {
    this.fastify.register(cors);
    this.fastify.register(helmet, {
      dnsPrefetchControl: { allow: true },
      frameguard: { action: 'deny' },
      referrerPolicy: { policy: 'no-referrer' },
    });
    // this.fastify.register(underPressure, {
    //   maxEventLoopDelay: 1000,
    //   maxHeapUsedBytes: 100000000,
    //   maxRssBytes: 100000000,
    // });
  }

  public async setupRoutes(): Promise<void> {
    await this.loadRoutes('public');
  }

  private async loadRoutes(type: string): Promise<void> {
    const routes: Array<string> = await fs.readdirSync(`${__dirname}/routes/${type}`);
    if (routes.length) {
      routes.forEach(async (file: string): Promise<void> => {
        const fileFullPath: string = `./routes/${type}/${file}`;
        const Route = await Server.importRoute(fileFullPath);
        this.fastify.register(Route.load, { prefix: Route.path, isPublic: Route.isPublic });
      });
    }
  }

  private static async importRoute(fileFullPath: string): Promise<any> {
    const Route = await import(fileFullPath);
    return Route.default;
  }

  public async start(): Promise<Promise<any>> {
    return new Promise((resolve, reject) => {
      this.fastify.listen(this.port, (error: any, address: string) => {
        if (error) {
          console.error(error);
          reject(error);
        }
        console.info(`Server listening on ${address}`);
        console.info(this.fastify.printRoutes());
        resolve();
      });
    });
  }

  public async close(): Promise<Promise<any>> {
    return new Promise((resolve, reject) => {
      this.fastify.close().then(() => {
        console.info('Server closed.');
        resolve();
      }, (error) => {
        console.error('An error occurred while trying to close the server.');
        console.error(error);
        reject(error);
      });
    });
  }
}
