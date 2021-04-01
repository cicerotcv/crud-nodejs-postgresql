import * as express from 'express';
import 'reflect-metadata';
import createConnection from './database';
import { router } from './routes';
import morgan = require('morgan');
require('dotenv-safe').config();

createConnection();

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(router);

app.listen(3333, () => console.log('Server running'));
