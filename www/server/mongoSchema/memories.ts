import { Schema, model } from "mongoose";

export const memoriesSchema = new Schema({
  summary: { type: String  , default: undefined },
  title: { type: String  , default: undefined },
  personIds: { type: Schema.Types.ObjectId, ref: 'persons' },
  media: { type: Schema.Types.Mixed  , default: undefined },
  createdByUid: { type: Schema.Types.ObjectId, ref: 'users' },
  capturedAt: { type: Date  , default: undefined },
  embeddings: { type: String  , default: undefined },
}, {
   _id: true,
   timestamps: true
   });

export const memories = model('memories', memoriesSchema)
