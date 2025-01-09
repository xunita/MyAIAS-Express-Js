const { getLogger } = require('../logger/config')

const { logger } = getLogger()
//
const errorHandler = (err, req, res, next) => {
  logger.error(err)
  res.status(500).json({ error: 'An error has occured' })
}

module.exports = { errorHandler }
