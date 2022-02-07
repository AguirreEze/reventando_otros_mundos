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

    let order
    try {
      order = await Game.countDocuments({})
    } catch (err) {
      res.send({ error: err })
    }

    const newGame = {
      name,
      completed,
      gameCover,
      studio,
      order: order + 1,
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
