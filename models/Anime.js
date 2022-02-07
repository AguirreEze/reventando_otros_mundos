import { Schema, model, models } from "mongoose"

const animeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  cover: {
    type: String,
    required: true,
  },
  studio: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  genres: [
    {
      type: String,
      required: true,
    },
  ],
  year: {
    type: Number,
    required: true,
  },
  season: {
    type: String,
    required: true,
  },
  sinopsis: {
    type: String,
    required: true,
  },
  episodes: {
    type: Number,
  },
  createdAt: {
    type: String,
    required: true,
  },
  review: {
    type: Schema.Types.ObjectId,
    ref: "Review",
  },
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
