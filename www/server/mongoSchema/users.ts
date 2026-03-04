import { Schema, model } from "mongoose";

export const usersSchema = new Schema({
  displayName: { type: String  , default: undefined},
  email: { type: String  , default: undefined},
}, {
   _id: true,
   timestamps: true
   });

export const users = model('users', usersSchema)
