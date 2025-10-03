import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: { 
    type: mongoose.Schema.Types.Mixed, 
    required: false,
    default: false
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  type: { type: String, default: "local" },
  image: {type: mongoose.Schema.Types.Mixed, default: false}
}, {strict: false});

export const UserModel = mongoose.model('User', UserSchema);

