import { Counter } from 'prom-client';
import register from '../config/prometheusRegistryConfig.js';

export const httpRequestCounter = new Counter({
  name: 'http_requests_total',
  help: 'Count of HTTP requests made to my app',
  labelNames: ['method', 'route', 'statusCode'],
});

register.registerMetric(httpRequestCounter);
