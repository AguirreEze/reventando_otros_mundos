const errorHandler = (err, res) => {
  if (err.name === "CastError")
    return res.status(400).send({ error: "Data Malformed" })
  if (err.name === "ValidationError")
    return res.status(400).send({ error: err })
  if (err.name === "JsonWebTokenError")
    return res.status(401).send({ error: "Login First" })

  return res.status(500).send({ error: err })
}

export default errorHandler
