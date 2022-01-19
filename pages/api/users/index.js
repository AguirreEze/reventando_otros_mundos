import bcrypt from "bcrypt"
import errorHandler from "middleware/errorHandler"
import connectDB from "middleware/mongo"
import User from "models/User"

const handler = async (req, res) => {
  if (req.method === "POST") {
    const { username, password = "" } = req.body

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)
    const newUser = new User({ username, passwordHash })

    try {
      const savedUser = await newUser.save()
      return res.status(200).send(savedUser)
    } catch (err) {
      errorHandler(err, res)
    }
  }
}

export default connectDB(handler)
