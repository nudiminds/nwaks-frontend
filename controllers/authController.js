import Admin from "../models/Admin.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"


// ADMIN LOGIN
export const loginAdmin = async (req, res) => {
  try {

    const { email, password } = req.body

    const admin = await Admin.findOne({ email })

    if (!admin) {
      return res.status(400).json({ message: "Invalid credentials" })
    }

    const isMatch = await bcrypt.compare(password, admin.password)

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" })
    }

    const token = jwt.sign(
      { id: admin._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    )

    res.json({
      token,
      admin: {
        id: admin._id,
        email: admin.email
      }
    })

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}