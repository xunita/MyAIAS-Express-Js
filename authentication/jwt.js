const jwt = require('jsonwebtoken')
const config = require('../config/config')
const { getLogger } = require('../logger/config')
const { logger } = getLogger()
const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    const secretOrKey = base64Decode(config.jwt.secretOrKey)
    try {
      jwt.verify(token, secretOrKey, (err, whatisthis) => {
        if (err) {
          reject(false)
          logger.error('Token verification failed: ' + token)
        }
        resolve(true)
        logger.info('Token verified: ' + token)
      })
    } catch (error) {
      logger.error('Error trying to verify token, verifyToken, ' + error)
    }
  })
}

module.exports = { verifyToken }
