import jwt from 'jsonwebtoken';
import { FastifyRequest, FastifyReply } from 'fastify';

export interface DecodedJwt {
  [index: string]: object | string;
}

export class AuthenticateService {
  private static jwtAccessSecret: string = process.env.JWT_ACCESS_SECRET as string;

  private static jwtDataSecret: string = process.env.JWT_DATA_SECRET as string;

  private static jwtAlgorithm: string = 'HS256';

  public static generate(payload: object = {}): string {
    const options: object = {
      algorithm: AuthenticateService.jwtAlgorithm,
    };
    const token = jwt.sign(payload, AuthenticateService.jwtAccessSecret, options);
    return token;
  }

  public static verify(request: FastifyRequest, reply: FastifyReply, next: Function): void {
    request.jwt.access = AuthenticateService.verifyToken(AuthenticateService.jwtAccessSecret, 'x-access-token', request, reply);

    if (Object.prototype.hasOwnProperty.call(request.headers, 'x-data-token')) {
      request.jwt.payload = AuthenticateService.verifyToken(AuthenticateService.jwtDataSecret, 'x-data-token', request, reply);
    }

    next();
  }

  private static verifyToken(
    secret: string,
    header: string,
    request: FastifyRequest,
    reply: FastifyReply,
  ): string | object {
    try {
      const accessToken: string = request.headers[header] as string;
      const decoded: string | object = jwt.verify(accessToken, secret);
      return decoded;
    } catch (error) {
      reply.code(401).send({ success: false, error: error.message });
      return {};
    }
  }
}
