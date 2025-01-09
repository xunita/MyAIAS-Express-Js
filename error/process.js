const { getLogger } = require('../logger/config')

const { logger } = getLogger()
const setProcessException = () => {
  process.on('uncaughtException', (err) => {
    logger.error('Uncaught Exception: ' + err)
  })

  process.on('unhandledRejection', (err) => {
    logger.error('Unhandled Rejection: ' + err)
  })
}

module.exports = { setProcessException }
