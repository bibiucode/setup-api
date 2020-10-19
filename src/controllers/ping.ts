import Controller from '@controllers/controller';
import { FastifyRequest, FastifyReply } from 'fastify';

export default class PingController extends Controller {
  public static async pong(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
    console.log();

    return reply
      .type('application/json')
      .code(200)
      .send('pong');
  }
}
