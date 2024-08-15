import { Gauge } from 'prom-client';
import register from '../metrics/registry.js';
import { httpRequestCounter } from '../metrics/httpCounter.js';
import '../metrics/salesforceLimits.js';
import limitsFile from '../metrics/limits.json' assert { type: 'json' };

export class MetricsService {
  static async getMetrics() {
    return {
      contentType: register.contentType,
      body: await register.metrics(),
    };
  }

  requestCounter(method, path, statusCode) {
    httpRequestCounter.labels(method, path, statusCode).inc();
  }
}
