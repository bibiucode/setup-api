import { FastifyInstance } from 'fastify';
import { Router, RouterConfig } from '@routes/router';
import PingController from '@controllers/ping';

export default class Route extends Router {
  public static path: string = '/ping';

  public static isPublic: boolean = false;

  public static load(fastify: FastifyInstance, config: RouterConfig, done: Function): void {
    Route.setup(fastify, config);

    fastify
      .get('/', PingController.pong);

    done();
  }
}
