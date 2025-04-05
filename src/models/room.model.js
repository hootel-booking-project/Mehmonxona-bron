import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
  {
    number: {
      type: String,
      required: true,
      unique: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["single", "double", "suite", "deluxe"],
      lowercase: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    available: {
      type: Boolean, 
      default: true,
    },
  },
  {
    collection: "rooms",
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("Room", roomSchema);
