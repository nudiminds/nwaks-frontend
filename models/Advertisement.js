import mongoose from "mongoose"

const advertisementSchema = new mongoose.Schema(
{
  title: {
    en: String,
    kn: String
  },

  description:{
    en: String,
    kn: String
  },

  image: {
    type: String,
  },

  link: {
    type: String
  },

  active: {
    type: Boolean,
    default: true
  }
},
{ timestamps: true }
)

export default mongoose.model("Advertisement", advertisementSchema)