import { MetricsController } from '../controller/MetricController.js';

async function router(app) {
  app.get('/metrics', MetricsController.getMetrics);
}

export { router };
