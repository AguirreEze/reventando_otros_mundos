import { Schema, model, models } from "mongoose"

const game = new Schema({
  name: { type: String, required: true },
  createdAt: { type: String, required: true },
  completed: { type: Boolean, required: true },
  gameCover: { type: String, required: true },
  studio: { type: String, required: true },
  gameYear: { type: Number, required: true },
  steamLink: { type: String },
})

game.set("toJSON", {
  transform: (doc, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  },
})

const Game = models.Game || model("Game", game)

export default Game
