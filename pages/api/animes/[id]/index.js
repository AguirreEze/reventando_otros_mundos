import errorHandler from "middleware/errorHandler"
import connectDB from "middleware/mongo"
import Anime from "models/Anime"
import { getSession } from "next-auth/react"

const handler = async (req, res) => {
  if (req.method === "PUT") {
    const session = await getSession({ req })
    if (!session || session.user.group !== "Admin")
      return res.status(401).send({ error: "Unauthorized" })
    const {
      name,
      cover,
      studio,
      state,
      genres,
      year,
      season,
      sinopsis,
      episodes,
    } = req.body
    try {
      connectDB()
    } catch (err) {
      errorHandler(err, res)
    }

    const data = {
      name,
      cover,
      studio,
      state,
      sinopsis,
      genres,
      year,
      season,
      episodes,
    }
    const { id } = req.query

    try {
      const savedAnime = await Anime.findByIdAndUpdate(id, data)
      return res.status(200).json(savedAnime)
    } catch (err) {
      errorHandler(err, res)
    }
  }
  if (req.method === "DELETE") {
    const session = await getSession({ req })
    if (!session || session.user.group !== "Admin")
      return res.status(401).send({ error: "Unauthorized" })
    try {
      connectDB()
      const { id } = req.query
      const deletedAnime = await Anime.findByIdAndDelete(id)
      return res.status(200).json(deletedAnime)
    } catch (err) {
      errorHandler(err, res)
    }
  }
}

export default handler
