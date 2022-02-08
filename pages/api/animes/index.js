import errorHandler from "middleware/errorHandler"
import connectDB from "middleware/mongo"
import Anime from "models/Anime"
import { getSession } from "next-auth/react"

const handler = async (req, res) => {
  if (req.method === "POST") {
    const session = await getSession({ req })
    if (!session || session.user.group !== "Admin")
      return res.status(401).send({ error: "Unauthorized" })
  }
  const {
    name,
    cover,
    studio,
    state,
    genres,
    year,
    season,
    sinopsis,
    episodes = null,
  } = req.body
  const createdAt = new Date()

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
    createdAt: createdAt.toISOString(),
  }

  const anime = new Anime(data)
  try {
    await connectDB()
    const savedAnime = await anime.save()
    res.status(200).json(savedAnime)
  } catch (err) {
    errorHandler(err)
  }
}

export default handler
