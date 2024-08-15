import { MetricsService } from '../service/MetricService.js';

const metricsService = new MetricsService();

export class RequestHooks {
  constructor(app) {
    this.app = app;
  }

  registerHooks() {
    this.onResponse();
  }

  onRequest() {
    this.app.addHook('onRequest', (request, reply, done) => {
      request.log.info(
        {
          url: request.url,
          method: request.method,
          ip: request.ip,
        },
        'request received.',
      );

      done();
    });
  }

  onResponse() {
    this.app.addHook('onResponse', (request, reply, done) => {
      metricsService.requestCounter(
        request.method,
        request.url,
        reply.raw.statusCode,
      );

      done();
    });
  }
}
