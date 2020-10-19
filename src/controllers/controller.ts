import { FastifyRequest, FastifyReply } from 'fastify';

export default class Controller {
  public static async list(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
    return reply
      .type('application/json')
      .code(200)
      .send('default list');
  }

  public static async store(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
    return reply
      .type('application/json')
      .code(200)
      .send('default store');
  }

  public static async show(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
    return reply
      .type('application/json')
      .code(200)
      .send('default show');
  }

  public static async edit(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
    return reply
      .type('application/json')
      .code(200)
      .send('default edit');
  }

  public static async remove(request: FastifyRequest, reply: FastifyReply): Promise<FastifyReply> {
    return reply
      .type('application/json')
      .code(200)
      .send('default remove');
  }
}
