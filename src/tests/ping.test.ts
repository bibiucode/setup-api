import Server from '@src/server';

let server: any;
let token: any;

describe('test ping', () => {
  beforeAll(async () => {
    server = new Server();
    await server.setup();
    await server.start();

    token = await server.fastify.inject({
      method: 'GET',
      url: '/authenticate',
    });
  });

  afterAll(async () => {
    await server.close();
  });

  test('GET /ping', async (done) => {
    const response = await server.fastify.inject({
      method: 'GET',
      url: '/ping',
      headers: { 'x-access-token': token.body },
    });

    expect(response.body).toBe('pong');
    expect(response.statusCode).toBe(200);

    done();
  });
});
