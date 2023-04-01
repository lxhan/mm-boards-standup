import { FastifyInstance } from 'fastify';
import envPlugin from '@fastify/env';
import { ENV_OPTIONS } from '../config/env';

const init = async (server: FastifyInstance) => {
  try {
    await server.register(envPlugin, ENV_OPTIONS);
    await server.after();
  } catch (err) {
    console.error(err);
  }
};

export default init;
