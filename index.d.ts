import { FastifyInstance } from 'fastify';

declare module 'fastify' {
  interface FastifyInstance {
    config: {
      PORT: number;
      API_TOKEN: string;
      BASE_URL: string;
      BOARD_ID: string;
      TEMPLATE_BLOCK_ID: string;
    };
  }
}
