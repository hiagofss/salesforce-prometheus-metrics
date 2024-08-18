import { Gauge } from 'prom-client';
import register from '../config/prometheusRegistryConfig.js';
import { httpRequestCounter } from '../metrics/httpCounter.js';
import { getLimits } from './salesforce/SalesforceLimistsService.js';

export class MetricsService {
  static async getMetrics() {
    this.processSalesforceMetrics();

    return {
      contentType: register.contentType,
      body: await register.metrics(),
    };
  }
  static async processSalesforceMetrics() {
    getLimits().then((limits) => {
      for (const resource in limits) {
        for (const limitType in limits[resource]) {
          const value = limits[resource][limitType];

          switch (typeof value) {
            case 'number':
              this.generateMetric(resource, limitType, value);
              break;
            case 'object':
              for (const subType in value) {
                this.generateMetric(
                  `${resource}_${limitType}`,
                  subType,
                  value[subType],
                );
              }
              break;
            default:
              break;
          }
        }
      }
    });
  }

  static generateMetric(resource, type, value) {
    const metricName = `salesforce_limit_${resource}_${type}`;

    let gaugeMetric = register.getSingleMetric(metricName);

    if (!gaugeMetric) {
      gaugeMetric = new Gauge({
        name: metricName,
        help: `${resource}_${type} help`,
        labelNames: [resource, type],
        value: value,
      });

      register.registerMetric(gaugeMetric);
    }

    gaugeMetric.set(value);

    return gaugeMetric;
  }
  requestCounter(method, path, statusCode) {
    httpRequestCounter.labels(method, path, statusCode).inc();
  }
}
