module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["i.postimg.cc", "via.placeholder.com"],
  },
  env: {
    mongodburl: process.env.MONGODB_URI,
  },
}
