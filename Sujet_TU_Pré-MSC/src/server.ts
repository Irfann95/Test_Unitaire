import dotenv from 'dotenv';
import 'dotenv/config';
import { run } from './Config/mongo';
import app from './app';

if (process.env.NODE_ENV === 'dev') {
  dotenv.config({ path: '.env.dev.local', override: true });
  console.log('You are in dev mode !');
} else dotenv.config({ path: '.env', override: true });

const PORT = process.env.PORT || 3000;

run().catch(console.dir);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
