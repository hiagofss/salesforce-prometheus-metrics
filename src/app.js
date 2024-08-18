import Fastify from 'fastify';
import fastifyCors from '@fastify/cors';
import { RequestHooks } from './hooks/requests.hooks.js';
import { router } from './router/routes.js';
const app = Fastify({ logger: true });

new RequestHooks(app).registerHooks();

await app.register(fastifyCors, {
  origin: '*',
  methods: ['GET'],
});

app.register(router);

export default app;
