import { DecodedJwt } from '@services/authenticate';

declare module 'fastify'{
  // eslint-disable-next-line no-unused-vars
  interface FastifyRequest {
    jwt: DecodedJwt;
  }
}
