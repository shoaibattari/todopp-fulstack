import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "descriptin is required"],
      trim: true,
    },
  },
  { timestamps: true }
);

const TodoModel = mongoose.model("todo", todoSchema);
export default TodoModel;
