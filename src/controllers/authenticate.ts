import { FastifyRequest, FastifyReply } from 'fastify';
import { AuthenticateService } from '@services/authenticate';

export default class AuthenticateController {
  public static async authenticate(
    request: FastifyRequest,
    reply: FastifyReply,
  ): Promise<FastifyReply> {
    return reply
      .type('application/json')
      .code(200)
      .send(AuthenticateService.generate());
  }
}
