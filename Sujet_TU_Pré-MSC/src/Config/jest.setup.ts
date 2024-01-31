import dotenv from 'dotenv';
import 'dotenv/config';
import { setDbName } from '../../src/Config/mongo';

export default async () => {
  if (process.env.NODE_ENV === 'test') {
    dotenv.config({ path: '.env.test.local', override: true });
  } else dotenv.config({ path: '.env', override: true });
  setDbName(process.env.DB || 'tests');
};
