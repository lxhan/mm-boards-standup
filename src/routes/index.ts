import { FastifyInstance } from 'fastify';
import axios from 'axios';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { getHeaders } from '../config/http';

dayjs.extend(utc);
dayjs.extend(timezone);

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

      const newDate = dayjs().tz('Asia/Seoul', true).unix();
      const reqData = {
        title: new Date().toLocaleDateString('en-GB', {
          weekday: 'long',
          month: 'numeric',
          year: 'numeric',
          day: 'numeric',
        }),
        updatedFields: {
          properties: {
            a39x5cybshwrbjpc3juaakcyj6e: `{"from": ${newDate}}`,
            ae9ar615xoknd8hw8py7mbyr7zo: 'a1wj1kupmcnx3qbyqsdkyhkbzgr',
            ao44fz8nf6z6tuj1x31t9yyehcc: [
              'ppmdhd5y138zbpqb3ocwy3r7rc',
              'cqmg9gu3ptyadk31s8wrdxhtsa',
              'rw4cxgm1qpgmzd5ts78dgts38e',
              '3wid7xjx73y63ct3wh3k61ot6w',
              '11ei69wt47fz9kg4rypwx4drse',
              '1jtucy8b7pfu7btahd3k141bgc',
              'bjpsfhgp7try8jsr845qpgbifa',
            ],
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
