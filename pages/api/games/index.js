import Game from "models/Game"
import connectDB from "middleware/mongo"
import errorHandler from "middleware/errorHandler"
import { getSession } from "next-auth/react"

const handler = async (req, res) => {
  if (req.method === "POST") {
    const session = await getSession({ req })
    if (!session || session.user.group !== "Admin")
      return res.status(401).send({ error: "Unauthorized" })

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

    const createdAt = new Date()
    const newGame = {
      name,
      completed,
      gameCover,
      studio,
      createdAt: createdAt.toISOString(),
      gameYear,
      steamLink,
    }
    const game = new Game(newGame)
    try {
      const savedGame = await game.save()
      res.status(200).json(savedGame)
    } catch (err) {
      errorHandler(err, res)
    }
  }
}

export default handler
