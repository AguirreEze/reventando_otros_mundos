module.exports = {
  reactStrictMode: true,
  images: {
    domains: [
      "i.postimg.cc",
      "via.placeholder.com",
      "firebasestorage.googleapis.com",
    ],
  },
  env: {
    mongodburl: process.env.MONGODB_URI,
  },
}
