import app from './app.js';

const PORT = parseInt(process.env.PORT) || 3000;

const stopServer = async () => {
  try {
    await app.close();

    process.exit(0);
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
};

process.on('SIGINT', () => {
  app.log.warn('Received SIGINT');
  stopServer();
});

process.on('SIGTERM', () => {
  app.log.warn('Received SIGTERM');
  stopServer();
});

const startServer = async () => {
  try {
    await app.ready();
    await app.listen({ port: PORT, host: '0.0.0.0' });
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
};

startServer();
