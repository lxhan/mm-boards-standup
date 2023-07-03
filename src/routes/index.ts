import { FastifyInstance } from 'fastify';
import { getUnixTime } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import axios from 'axios';
import { getHeaders } from '../config/http';

const init = async (server: FastifyInstance) => {
  server.get('/ping', async (_, reply) => {
    reply.send({ message: utcToZonedTime(new Date(), 'Asia/Seoul') });
  });

  server.get('/reminder', async (_, reply) => {
    const { WEBHOOK, ZOOM } = server.config;
    await axios.post(
      WEBHOOK,
      {
        text: `@channel \nDon't forget to fill out the daily report before the 1 PM KST meeting.\nSee you on Zoom!\n${ZOOM}`,
      },
      { headers: { 'Content-Type': 'application/json' } }
    );

    reply.send({ ok: true });
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

      const newDate = utcToZonedTime(new Date(), 'Asia/Seoul');
      const reqData = {
        title: newDate.toLocaleDateString('en-GB', {
          weekday: 'long',
          month: 'numeric',
          year: 'numeric',
          day: 'numeric',
        }),
        updatedFields: {
          properties: {
            a39x5cybshwrbjpc3juaakcyj6e: `{"from": ${
              getUnixTime(newDate) * 1000
            }}`,
            ae9ar615xoknd8hw8py7mbyr7zo: 'a1wj1kupmcnx3qbyqsdkyhkbzgr',
            ao44fz8nf6z6tuj1x31t9yyehcc: [
              'ppmdhd5y138zbpqb3ocwy3r7rc',
              'cqmg9gu3ptyadk31s8wrdxhtsa',
              'rw4cxgm1qpgmzd5ts78dgts38e',
              '3wid7xjx73y63ct3wh3k61ot6w',
              '11ei69wt47fz9kg4rypwx4drse',
              '1jtucy8b7pfu7btahd3k141bgc',
              '51q6synw3jfduxeehd5bofbb7o',
              'pxeg7pzkupgg3pohu58n473zqa',
              'yo5gpm4kotyqfp3t7eggzusfyr',
              'boqnot1rr7gb5nuusfephm9jzh',
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
