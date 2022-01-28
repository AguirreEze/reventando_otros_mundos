import { model, models, Schema } from "mongoose"

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
  state: {
    type: String,
    required: true,
  },
  sinopsis: {
    type: String,
    required: true,
  },
  genres: {
    type: [{ type: String, required: true }],
    required: true,
  },
  comentary: {
    type: String,
  },
  year: {
    type: Number,
    required: true,
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
