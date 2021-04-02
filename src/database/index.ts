import { Connection, createConnection, getConnectionOptions } from 'typeorm';
const dotenvSafe = require('dotenv-safe');
dotenvSafe.config();

export default async (): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();

  return createConnection(
    Object.assign(defaultOptions, {
      host: process.env.DB_HOST,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT
    })
  );
};
