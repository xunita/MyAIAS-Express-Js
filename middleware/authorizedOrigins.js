const { allowedOrigins } = require('../constants/origins')

const allowOrigins = (origin, callback) => {
  if (!origin || allowedOrigins.includes(origin)) {
    return callback(null, true)
  }
  return callback(new Error('Not allowed by CORS'))
}

module.exports = allowOrigins
