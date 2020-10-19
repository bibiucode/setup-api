import { FastifyInstance } from 'fastify';
import { Router, RouterConfig } from '@routes/router';
import AuthenticateController from '@controllers/authenticate';

export default class Route extends Router {
  public static path: string = '/authenticate';

  public static isPublic: boolean = true;

  public static load(fastify: FastifyInstance, config: RouterConfig, done: Function): void {
    Route.setup(fastify, config);

    fastify
      .get('/', AuthenticateController.authenticate);

    done();
  }
}
