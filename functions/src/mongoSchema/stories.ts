import { Schema, model } from "mongoose";

export const storiesSchema = new Schema({
  title: { type: String  , default: undefined },
  createdAt: { type: String  , default: undefined },
  createdByUid: { type: String  , default: undefined},
  segments: { type: [Schema.Types.Mixed]  , default: undefined },
  topics: { type: [String]  , default: undefined },
}, {
   _id: true,
   timestamps: true
   });

export const stories = model('stories', storiesSchema)
