import { Schema, model } from "mongoose";

export const sessionsSchema = new Schema({
  status: { type: String  , default: undefined },
  createdByUid: { type: String , required: true , default: undefined},
  mode: { type: String  , default: undefined },
  memoryContext: { type: [String]  , default: undefined },
}, {
   _id: true,
   timestamps: false
   });

export const sessions = model('sessions', sessionsSchema)
