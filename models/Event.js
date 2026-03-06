import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
{
  title: {
    en: { type: String, required: true },
    kn: { type: String, required: true }
  },

  description: {
    en: { type: String, required: true },
    kn: { type: String, required: true }
  },

  date: {
    type: Date,
    required: true
  },

  location: {
    en: String,
    kn: String
  },

  image: String
},
{ timestamps: true }
);

export default mongoose.model("Event", eventSchema);