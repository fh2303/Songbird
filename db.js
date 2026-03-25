import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  hash: { type: String },
  polls: [mongoose.Schema.Types.ObjectId],
});

const PollSchema = new mongoose.Schema(
  {
    creator: mongoose.Schema.Types.ObjectId,
    eventDetails: {
      title: { type: String, required: true },
      locationName: String,
      time: Date,
    },

    votes: { type: Number, default: 0 },
    voters: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { createdAt: true }
);

export const User = mongoose.model("User", UserSchema);
export const Poll = mongoose.model("Poll", PollSchema);
