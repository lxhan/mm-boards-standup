const schema = {
  type: 'object',
  required: ['PORT', 'API_TOKEN', 'BASE_URL', 'BOARD_ID', 'TEMPLATE_BLOCK_ID'],
  properties: {
    PORT: {
      type: 'string',
      default: 8080,
    },
    API_TOKEN: {
      type: 'string',
    },
    BASE_URL: {
      type: 'string',
    },
    BOARD_ID: {
      type: 'string',
    },
    TEMPLATE_BLOCK_ID: {
      type: 'string',
    },
    WEBHOOK: {
      type: 'string',
    },
    ZOOM: {
      type: 'string',
    },
  },
};

export const ENV_OPTIONS = {
  schema: schema,
  dotenv: true,
};
