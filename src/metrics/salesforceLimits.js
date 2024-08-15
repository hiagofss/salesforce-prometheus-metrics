import limitsFile from './limits.json' assert { type: 'json' };
import register from './registry.js';
import { Gauge } from 'prom-client';

function generateMetric(resource, type, value) {
  const metricName = `salesforce_limit_${resource}_${type}`;

  let gaugeMetric = new Gauge({
    name: metricName,
    help: `${resource}_${type} help`,
    labelNames: [resource, type],
    value: value,
  });

  gaugeMetric.set(value);

  return gaugeMetric;
}

function convertToPrometheus(data) {
  for (const resource in data) {
    for (const limitType in data[resource]) {
      const value = data[resource][limitType];

      switch (typeof value) {
        case 'number':
          register.registerMetric(generateMetric(resource, limitType, value));
          break;
        case 'object':
          for (const subType in value) {
            register.registerMetric(
              generateMetric(
                `${resource}_${limitType}`,
                subType,
                value[subType],
              ),
            );
          }
          break;
        default:
          break;
      }
    }
  }
}

convertToPrometheus(limitsFile);
