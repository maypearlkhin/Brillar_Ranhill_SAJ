import mongoose from "mongoose";

/**
 * Mongoose connection helper, prepared ahead of any backend/API work.
 *
 * This module intentionally exposes only a connection function. No models,
 * schemas, or CRUD helpers live here yet — see `/models` for where future
 * schemas should be defined once backend features are implemented.
 *
 * The connection is cached on the Node.js global object so hot-reloading
 * in development does not exhaust the MongoDB connection pool.
 */

type MongooseGlobalCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

declare global {
  var __mongooseCache: MongooseGlobalCache | undefined;
}

const cache: MongooseGlobalCache = globalThis.__mongooseCache ?? {
  conn: null,
  promise: null,
};

if (!globalThis.__mongooseCache) {
  globalThis.__mongooseCache = cache;
}

export async function connectToDatabase(): Promise<typeof mongoose | null> {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    return null;
  }

  if (cache.conn) {
    return cache.conn;
  }

  if (!cache.promise) {
    cache.promise = mongoose.connect(uri, {
      bufferCommands: false,
    });
  }

  cache.conn = await cache.promise;
  return cache.conn;
}

export default connectToDatabase;
