import { Schema, model } from "mongoose";

export const usersSchema = new Schema({
  uid: { type: String, default: undefined },
  displayName: { type: String  , default: undefined},
  email: { type: String  , default: undefined},
  photoURL: { type: String, default: undefined },
  phoneNumber: { type: String, default: undefined },
  emailVerified: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
}, {
   _id: true,
   timestamps: true
   });

export const users = model('users', usersSchema)
