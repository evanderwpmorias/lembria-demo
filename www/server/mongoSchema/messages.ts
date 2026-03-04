import { Schema, model } from "mongoose";

export const messagesSchema = new Schema({
  role: { type: String  , default: undefined },
  text: { type: String  , default: undefined },
  timestamp: { type: Date  , default: undefined },
  memoryIds: { type: [String]  , default: undefined},
}, {
   _id: true,
   timestamps: false
   });

export const messages = model('messages', messagesSchema)
