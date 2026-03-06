import mongoose from "mongoose"

const sponsorSchema = new mongoose.Schema(
{
  name: {
    en: { type: String, required: true },
    kn: { type: String, required: true }
  },

  category: {
    type: String,
    enum: ["platinum", "gold", "silver"],
    required: true
  },

  website: {
    type: String
  },

  logo: {
    type: String
  }
},
{ timestamps: true }
)

export default mongoose.model("Sponsor", sponsorSchema)