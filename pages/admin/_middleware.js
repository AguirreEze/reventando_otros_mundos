const tokenExtractor = (req, res) => {
  const { authorization } = req.headers
  let token
  if (authorization && authorization.toLowerCase().startsWith("bearer")) {
    token = authorization.substring(7)
  } else token = null
  req.token = token
}

export default tokenExtractor
