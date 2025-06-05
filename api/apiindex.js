// apiindex.js
import app from './index.js'; // Mengimpor 'app' dari index.js
import serverless from 'serverless-http';

const handler = serverless(app);
export default handler;