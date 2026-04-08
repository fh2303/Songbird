import mongoose from "mongoose";
import { Schema } from "mongoose";

const userSchema = new Schema(
  {
    username: { type: String, unique: true },
    name: String,
    age: Number,
    email: { type: String, required: true, lowercase: true },
    hash: { type: String, required: true },
    polls: [Schema.Types.ObjectId],
  },
  { timestamps: true },
);

const pollSchema = new Schema(
  {
    creator: { type: Schema.Types.ObjectId, default: "Anonymous" },
    eventDetails: {
      title: { type: String, required: true },
      locationName: String,
      time: Date,
      details: String,
    },
    votes: { type: Number, default: 0 },
    voters: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true },
);

const messageSchema = new Schema(
  {
    content: { type: String, required: true },
    sender: { type: String, default: "Anonymous" },
  },
  { timestamps: true },
);

export const User = mongoose.model("User", userSchema);
export const Poll = mongoose.model("Poll", pollSchema);
export const Message = mongoose.model("Message", messageSchema);
