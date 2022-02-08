module.exports = {
  reactStrictMode: true,
  images: {
    domains: [
      "i.postimg.cc",
      "via.placeholder.com",
      "firebasestorage.googleapis.com",
      "res.cloudinary.com",
    ],
  },
  env: {
    mongodburl: process.env.MONGODB_URI,
  },
}
