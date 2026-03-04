import { Schema, model } from "mongoose";

export const personsSchema = new Schema({
  displayName: { type: String  , default: undefined},
  birthYear: { type: String  , default: undefined},
  relationHint: { type: String  , default: undefined},
}, {
   _id: true,
   timestamps: true
   });

export const persons = model('persons', personsSchema)
