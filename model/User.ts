import mongoose from "mongoose";

const Schema = mongoose.Schema;

const taskSchema = new Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
    default: "No description",
  },
  subtasks: {
    type: [String],
    default: [],
  },
  status: {
    type: String,
    default: "todo",
  },
});

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  tasks: {
    type: [taskSchema],
  },
  refreshToken: {
    type: String,
  },
});

export default mongoose.model("User", userSchema);
