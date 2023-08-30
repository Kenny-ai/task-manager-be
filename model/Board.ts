import mongoose from "mongoose";

const Schema = mongoose.Schema;

const taskSchema = new Schema(
  {
    title: { type: String, trim: true },
    description: { type: String, trim: true },
    subtasks: [
      {
        type: String,
        isCompleted: Boolean,
      },
    ],
    phase: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);


export const boardSchema = new Schema(
  {
    name: { type: String, trim: true },
    tasks: [taskSchema],
    phases: [String],
    owner: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export default mongoose.model("Board", boardSchema);
