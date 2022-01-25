import { Schema, model, models } from "mongoose"
import uniqueValidator from "mongoose-unique-validator"

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    minlength: [3, "username should be at least 3 characters long"],
    unique: true,
  },
  passwordHash: { type: String, required: true },
})

userSchema
  .set("toJSON", {
    transform: (doc, returnedObject) => {
      returnedObject.id = returnedObject._id
      delete returnedObject._id
      delete returnedObject.__v
      delete returnedObject.passwordHash
    },
  })
  .plugin(uniqueValidator, { message: `Error, expected {PATH} to be unique` })

const User = models.User || model("User", userSchema)

export default User
