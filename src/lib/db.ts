import mongoose from "mongoose";

const globalForMongoose = globalThis as unknown as {
  mongoose: { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null };
};

if (!globalForMongoose.mongoose) {
  globalForMongoose.mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  const MONGODB_URI = process.env.MONGODB_URI;

  if (!MONGODB_URI) {
    console.warn("MONGODB_URI is not defined — skipping database connection");
    return null;
  }

  if (globalForMongoose.mongoose.conn) return globalForMongoose.mongoose.conn;

  if (!globalForMongoose.mongoose.promise) {
    globalForMongoose.mongoose.promise = mongoose.connect(MONGODB_URI, {
      dbName: "premium_agency_saas",
    });
  }

  globalForMongoose.mongoose.conn = await globalForMongoose.mongoose.promise;
  return globalForMongoose.mongoose.conn;
}
