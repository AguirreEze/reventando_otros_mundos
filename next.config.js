module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["i.postimg.cc"],
  },
  env: {
    mongodburl: process.env.MONGODB_URI,
  },
}
