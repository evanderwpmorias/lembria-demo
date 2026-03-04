import { Schema, model } from "mongoose";

export const familiesSchema = new Schema({
  ownerUid: { type: String  , default: undefined},
  name: { type: String  , default: undefined},
}, {
   _id: true,
   timestamps: true
   });

export const families = model('families', familiesSchema)
