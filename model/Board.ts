import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const subtaskSchema = new Schema({
  title: { type: String, trim: true },
  isCompleted: { type: Boolean },
});

const taskSchema = new Schema(
  {
    title: { type: String, trim: true },
    description: { type: String, trim: true },
    subtasks: [subtaskSchema],
    status: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);


export const phaseSchema = new Schema({
  title: { type: String, trim: true },
});

export const boardSchema = new Schema(
  {
    name: { type: String, trim: true },
    tasks: [taskSchema],
    phaseList: [phaseSchema],
    owner: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export default mongoose.model("Board", boardSchema);
