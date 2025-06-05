import app from '../PROJECT-SADARI/index.js';
import serverless from 'serverless-http';

export const handler = serverless(app);