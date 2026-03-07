import mongoose from "mongoose";
import { defineNitroPlugin, useRuntimeConfig } from "nitropack/runtime";

export default defineNitroPlugin(async () => {
  try {
    const { mongodbUri } = useRuntimeConfig() as { mongodbUri?: string };
    if (!mongodbUri) {
      console.warn("mongodbUri is not defined in runtime config.");
      return;
    }

    if (mongoose.connection.readyState === 1) {
      console.info("DB already connected.");
      return;
    }

    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('MongoDB disconnected.');
    });

    await mongoose.connect(mongodbUri);
    console.info("DB connection established.");
  } catch (err) {
    console.info("DB connection failed.");
    console.error(err);
  }
});