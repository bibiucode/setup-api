import { FastifyInstance } from 'fastify';
import { AuthenticateService } from '@services/authenticate';

export interface RouterConfig {
  prefix: string;
  isPublic: boolean;
}

export interface RouteConfig {
  path: string;
  isPublic: boolean;
  load: Function;
}

export class Router {
  public static setup(fastify: FastifyInstance, config: RouterConfig): void {
    Router.setupMiddlewares(fastify, config);
  }

  public static setupMiddlewares(fastify: FastifyInstance, config: RouterConfig): void {
    if (!config.isPublic) {
      fastify.decorateRequest('jwt', { access: undefined, payload: undefined });
      fastify.addHook('onRequest', AuthenticateService.verify);
    }
  }
}
