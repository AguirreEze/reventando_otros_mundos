import errorHandler from "middleware/errorHandler"
import connectDB from "middleware/mongo"
import Anime from "models/Anime"
import { getServerSession } from "next-auth"
import { authOptions } from "../../auth/[...nextauth]"

const handler = async (req, res) => {
  if (req.method === "PUT") {
    const session = await getServerSession(req, res, authOptions)
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
      score,
      watched,
      comentary,
    } = req.body

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
      score,
      watched,
      comentary,
    }
    const { id } = req.query

    try {
      await connectDB()
      const savedAnime = await Anime.findByIdAndUpdate(id, data)
      return res.status(200).json(savedAnime)
    } catch (err) {
      errorHandler(err, res)
    }
  }
  if (req.method === "DELETE") {
    const session = await getServerSession(req, res, authOptions)
    if (!session || session.user.group !== "Admin")
      return res.status(401).send({ error: "Unauthorized" })
    try {
      await connectDB()
      const { id } = req.query
      const deletedAnime = await Anime.findByIdAndDelete(id)
      return res.status(200).json(deletedAnime)
    } catch (err) {
      errorHandler(err, res)
    }
  }
}

export default handler
