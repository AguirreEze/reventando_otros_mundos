import { Schema, models, model } from "mongoose"

const reviewSchema = new Schema({
  score: {
    type: Number,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  watched: {
    type: Number,
    required: true,
  },
  comentary: {
    type: String,
    required: true,
  },
  anime: {
    type: Schema.Types.ObjectId,
    ref: "Anime",
  },
})

reviewSchema.set("toJSON", {
  transform: (doc, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  },
})

const Review = models.Review || model("review", reviewSchema)

export default Review
