import mongoose from "mongoose"

const mediaSchema = new mongoose.Schema(
{
  title:{
    en:{ type:String, required:true },
    kn:{ type:String, required:true }
  },

  description:{
    en:String,
    kn:String
  },

  category:{
    type:String,
    enum:["event","festival","community","other"],
    default:"other"
  },

  type:{
    type:String,
    enum:["image","video"],
    required:true
  },

  image:{
    type:String
  },

  videoUrl:{
    type:String
  }
},
{ timestamps:true }
)

export default mongoose.model("Media",mediaSchema)