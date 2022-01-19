const errorHandler = (err, res) => {
  console.log(err.name)
  if (err.name === "CastError")
    return res.status(400).send({ error: "Data Malformed" })
  if (err.name === "ValidationError")
    return res.status(400).send({ error: err })
  if (err.name === "JsonWebTokenError")
    return res.status(401).send({ error: "invalid Token" })
}

export default errorHandler
