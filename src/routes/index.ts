import { FastifyInstance } from 'fastify';
import axios from 'axios';
import { getHeaders } from '../config/http';

const init = async (server: FastifyInstance) => {
  server.get('/ping', async (request, reply) => {
    return 'pong\n';
  });

  server.get('/daily', async (_, reply) => {
    try {
      const { API_TOKEN, BASE_URL, TEMPLATE_BLOCK_ID, BOARD_ID } =
        server.config;
      const headers = getHeaders(API_TOKEN);
      const cartTemplate = await axios.post(
        `${BASE_URL}/boards/${BOARD_ID}/blocks/${TEMPLATE_BLOCK_ID}/duplicate?asTemplate=false`,
        null,
        headers
      );
      const block = cartTemplate.data[0];
      const blockId = block.id;

      const reqData = {
        title: new Date().toLocaleDateString('en-GB', {
          weekday: 'long',
          month: 'numeric',
          year: 'numeric',
          day: 'numeric',
        }),
        updatedFields: {
          properties: {
            a39x5cybshwrbjpc3juaakcyj6e: `{"from": ${Date.now()}}`,
            ae9ar615xoknd8hw8py7mbyr7zo: 'a1wj1kupmcnx3qbyqsdkyhkbzgr',
          },
        },
      };
      await axios.patch(
        `${BASE_URL}/boards/${BOARD_ID}/blocks/${blockId}`,
        reqData,
        headers
      );
      reply.send({ ok: true });
    } catch (err) {
      console.error(err);
    }
  });
};

export default init;
