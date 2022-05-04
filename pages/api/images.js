import { getSession } from "next-auth/react"
import cloudinary from "cloudinary"
import errorHandler from "middleware/errorHandler"

const handler = async (req, res) => {
  console.log("test")
  if (req.method === "POST") {
    const session = await getSession({ req })
    if (!session || session.user.group !== "Admin")
      return res.status(401).send({ error: "Unauthorized" })
  }
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    })
    const uploadedImage = await cloudinary.v2.uploader.upload(req.body.data, {
      upload_preset: "ReventandoOtrosMundos",
    })
    res.status(200).json(uploadedImage)
  } catch (err) {
    errorHandler(err, res)
  }
}

export default handler
