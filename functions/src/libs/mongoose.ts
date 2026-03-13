import mongoose from "mongoose";
import {defineSecret} from "firebase-functions/params";

export const mongoDbSecret = defineSecret("MONGODB_URI");

let connectPromise: Promise<typeof mongoose> | null = null;
let listenersAttached = false;

const attachConnectionListeners = () => {
  if (listenersAttached) return;
  listenersAttached = true;

  mongoose.connection.on("connected", () => {
    console.info("MongoDB connected.");
  });

  mongoose.connection.on("error", (err) => {
    console.error("MongoDB connection error:", err);
  });

  mongoose.connection.on("disconnected", () => {
    console.warn("MongoDB disconnected.");
  });
};

export const ensureDbConnected = async (): Promise<void> => {
  if (mongoose.connection.readyState === 1) return;

  if (connectPromise) {
    await connectPromise;
    return;
  }

  const uri = mongoDbSecret.value() || process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI is not configured. Set Firebase secret MONGODB_URI.");
  }

  attachConnectionListeners();

  try {
    connectPromise = mongoose.connect(uri, {
      serverSelectionTimeoutMS: 10000,
    });
    await connectPromise;
  } catch (err) {
    connectPromise = null;
    throw err;
  }
};