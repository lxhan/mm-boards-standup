import fastify from 'fastify';
import initPlugins from './plugins';
import initRoutes from './routes';

async function main() {
  const server = fastify({ logger: true });

  await initPlugins(server);

  await initRoutes(server);

  server.listen(
    { port: server.config.PORT, host: '0.0.0.0' },
    (err, address) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      console.log(`Server listening at ${address}`);
    }
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
