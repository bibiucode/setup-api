import Server from '@src/server';

let server: any;
let token: any;

describe('authenticate', () => {
  beforeAll(async () => {
    server = new Server();
    await server.setup();
    await server.start();
  });

  afterAll(async () => {
    await server.close();
  });

  test('GET /authenticate and get valid token', async (done) => {
    const response = await server.fastify.inject({
      method: 'GET',
      url: '/authenticate',
    });

    token = response.body;

    expect(typeof token).toBe('string');
    expect(response.statusCode).toBe(200);

    done();
  });

  test('GET /ping with a malformed token', async (done) => {
    const response = await server.fastify.inject({
      method: 'GET',
      url: '/ping',
      headers: { 'x-access-token': 'malformedtoken' },
    });
    const body = JSON.parse(response.body);

    expect(body).toEqual({ success: false, error: 'jwt malformed' });
    expect(response.statusCode).toBe(401);

    done();
  });

  test('GET /ping with a invalid signature', async (done) => {
    const response = await server.fastify.inject({
      method: 'GET',
      url: '/ping',
      headers: { 'x-access-token': `${token}1` },
    });
    const body = JSON.parse(response.body);

    expect(body).toEqual({ success: false, error: 'invalid signature' });
    expect(response.statusCode).toBe(401);

    done();
  });

  test('GET /ping with a valid token', async (done) => {
    const response = await server.fastify.inject({
      method: 'GET',
      url: '/ping',
      headers: { 'x-access-token': token },
    });

    expect(response.body).toBe('pong');
    expect(response.statusCode).toBe(200);

    done();
  });

  test('GET /ping with a valid dataToken and accessToken', async (done) => {
    const response = await server.fastify.inject({
      method: 'GET',
      url: '/ping',
      headers: {
        'x-access-token': token,
        'x-data-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MDI4NzQ5MDN9.suWbBA2YuQ3fudGsbALnZafTiIuPNblrWBjF6QZDGkA',
      },
    });

    expect(response.body).toBe('pong');
    expect(response.statusCode).toBe(200);

    done();
  });
});
