import { model, models, Schema } from "mongoose"
import AnimeEpisode from "./AnimeEpisode"

const animeSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  cover: {
    type: String,
    required: true,
  },
  genres: {
    type: [{ type: String, required: true }],
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  sinopsis: {
    type: String,
    required: true,
  },
  comentary: {
    type: String,
  },
  season: {
    type: String,
    required: true,
  },
  episodes: [AnimeEpisode],
})

animeSchema.set("toJSON", {
  transform: (doc, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  },
})

const Anime = models.Anime || model("Anime", animeSchema)

export default Anime
