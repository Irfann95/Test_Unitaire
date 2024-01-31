import { MongoClient, ObjectId } from 'mongodb';
import { logger } from './winston';

// Connection URI
const uri: string = <string>process.env.MONGO_URL;

// Create a new MongoClient
export const client = new MongoClient(uri);

export const toObjectId = (id: string) => {
  return ObjectId.createFromHexString(id);
};

let db = client.db(process.env.DB);

export { db };

export const getCollection = (collection: string) => {
  return db.collection(collection);
};

export const dropCollection = async (collectionName: string) => {
  if (db) {
    const collection = db.collection(collectionName);
    if (collection) {
      await collection.drop();
    }
  }
};

export async function setDbName(dbName: string) {
  db = client.db(dbName);
}

export async function closeDb() {
  await client.close();
}

export async function openDb() {
  await client.connect();
}

export async function run() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    db = client.db(process.env.DB);
    await client.connect();

    // Establish and verify connection
    await db.command({ ping: 1 });
    logger.info('Successfully connected to server');
  } catch (e) {
    /* istanbul ignore next */
    logger.error('Mongo connexion error', e);
    /* istanbul ignore next */
    await client.close();
  }
}

export async function isConnected() {
  try {
    await db.command({ ping: 1 });
    return true;
  } catch (e) {
    return false;
  }
}
