import { Registry, collectDefaultMetrics } from 'prom-client';

const register = new Registry();
register.setDefaultLabels({});

// collectDefaultMetrics({ register });

export default register;
