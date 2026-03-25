import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  name: String,
  age: Number,
  email: { type: String, required: true, lowercase: true },
  hash: { type: String, required: true },
  polls: [mongoose.Schema.Types.ObjectId],
});

const PollSchema = new mongoose.Schema({
  creator: mongoose.Schema.Types.ObjectId,
  eventDetails: {
    title: { type: String, required: true },
    locationName: String,
    time: Date,
  },

  votes: { type: Number, default: 0 },
  voters: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  createdAt: { type: Date, immutable: true, default: () => Date.now() },
});

export const User = mongoose.model("User", UserSchema);
export const Poll = mongoose.model("Poll", PollSchema);
