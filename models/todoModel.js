import mongoose from "mongoose";
const { Schema } = mongoose;

const todoSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "descriptin is required"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: [true, "user is required"],
    },
  },
  { timestamps: true }
);

const TodoModel = mongoose.model("todo", todoSchema);
export default TodoModel;
