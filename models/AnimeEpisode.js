import { model, models, Schema } from "mongoose"

const episodeSchema = new Schema({
  number: {
    type: Number,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
})

const AnimeEpisode = models.AnimeEpisode || model("AnimeEpisode", episodeSchema)

export default AnimeEpisode
