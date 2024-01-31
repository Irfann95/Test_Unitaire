import bodyParser from 'body-parser';
import express from 'express';
import { errorHandler } from './Middleware/ErrorHandler';
import router from './v1/routes';

const app = express();

app.use(bodyParser.json());
app.use('/v1', router);
app.use(errorHandler);

export default app;
