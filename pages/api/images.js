import cloudinary from "cloudinary"
import errorHandler from "middleware/errorHandler"
import { getServerSession } from "next-auth"
import { authOptions } from "./auth/[...nextauth]"

const handler = async (req, res) => {
  if (req.method === "POST") {
    const session = await getServerSession(req, res, authOptions)
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
