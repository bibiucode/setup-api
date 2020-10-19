import Server from '@src/server';

require('dotenv').config();

(
  async (): Promise<void> => {
    const server = new Server(8080);
    await server.setup();
    await server.start();
  }
)();
