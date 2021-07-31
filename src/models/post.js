import { Schema as _Schema, model } from "mongoose";
const Schema = _Schema;
const postSchema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    imagePath: { type: String, required: false },
    creator: {
      type: _Schema.Types.ObjectId,
      ref: "Users",
      required: false,
    },
    createdAt: {
      type: _Schema.Types.Date,
      default: function () {
        return Date.now();
      },
    },
    updatedAt: {
      type: _Schema.Types.Date,
      default: function () {
        return Date.now();
      },
    },
    postStatus: { type: _Schema.Types.String, required: true },
  },
  {
    collection: "Posts",
    timestamps: true,
  }
);

export default model("Posts", postSchema);
