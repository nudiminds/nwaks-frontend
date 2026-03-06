import mongoose from "mongoose"
import dotenv from "dotenv"
import bcrypt from "bcryptjs"
import Admin from "./models/Admin.js"

dotenv.config()

mongoose.connect(process.env.MONGO_URI)

const createAdmin = async () => {

  const hashedPassword = await bcrypt.hash("admin123", 10)

  const admin = new Admin({
    email: "admin@nwaks.org",
    password: hashedPassword
  })

  await admin.save()

  console.log("Admin created successfully")

  process.exit()
}

createAdmin()