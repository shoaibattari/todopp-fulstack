import mongoose from "mongoose";
const { Schema } = mongoose;

const taskifySchema = new Schema(
  {
    title: { type: String, required: [true, "title is required"], trim: true },
    description: { type: String, required: [true, "description is required"] },
    avatar: {
      url: { type: String, default: "" },
      publicId: { type: String, default: "" },
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: [true, "user is required"],
    },
  },
  { timestamps: true }
);

const TaskifyModel = mongoose.model("taskify", taskifySchema);
export default TaskifyModel;
