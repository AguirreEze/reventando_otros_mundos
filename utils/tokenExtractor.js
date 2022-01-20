const tokenExtractor = (req) => {
  const { authorization } = req.headers
  let token
  if (authorization && authorization.toLowerCase().startsWith("bearer")) {
    token = authorization.substring(7)
  } else token = null
  return token
}

export default tokenExtractor
