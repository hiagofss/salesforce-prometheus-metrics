import { MetricsService } from '../service/MetricService.js';

export class MetricsController {
  constructor(app) {
    this.app = app;
  }

  static async getMetrics(request, reply) {
    const responseData = await MetricsService.getMetrics();
    reply.header('Content-Type', responseData.contentType);
    reply.send(responseData.body);
  }
}
