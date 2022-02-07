import Game from "models/Game"
import connectDB from "middleware/mongo"
import errorHandler from "middleware/errorHandler"
import { getSession } from "next-auth/react"

const handler = async (req, res) => {
  if (req.method === "PUT") {
    const session = await getSession({ req })
    if (!session || session.user.group !== "Admin")
      return res.status(401).send({ error: "Unauthorized" })

    const { id } = req.query
    const {
      name,
      completed = false,
      gameCover,
      studio,
      gameYear,
      steamLink,
    } = req.body

    try {
      await connectDB()
    } catch (err) {
      errorHandler(err, res)
    }

    const newGame = {
      name,
      completed,
      gameCover,
      studio,
      gameYear,
      steamLink,
    }
    try {
      const savedGame = await Game.findByIdAndUpdate(id, newGame)
      res.status(200).json(savedGame)
    } catch (err) {
      errorHandler(err, res)
    }
  }
  if (req.method === "DELETE") {
    const session = await getSession({ req })
    if (!session || session.user.group !== "Admin")
      return res.status(401).send({ error: "Unauthorized" })

    const { id } = req.query
    try {
      await connectDB()
    } catch (err) {
      errorHandler(err, res)
    }

    try {
      const savedGame = await Game.findByIdAndDelete(id)
      res.status(200).json(savedGame)
    } catch (err) {
      errorHandler(err, res)
    }
  }
}

export default handler
