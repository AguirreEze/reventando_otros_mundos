import connectDB from "middleware/mongo"
import bcrypt from "bcrypt"
import User from "models/User"
import jwt from "jsonwebtoken"

const handler = async (req, res) => {
  if (req.method === "POST") {
    const { username, password } = req.body

    const user = await User.findOne({ username })
    const passwordCorrect =
      user === null ? false : await bcrypt.compare(password, user.passwordHash)

    if (!(user && passwordCorrect))
      return res.status(401).json({ error: "user or password incorrect" })

    const userForToken = { username: user.username, id: user.id }

    const token = jwt.sign(userForToken, process.env.SECRET)
    res.status(200).send({
      username: user.username,
      id: user.id,
      token,
    })
  }
}

export default connectDB(handler)
