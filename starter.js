const dotenv = require('dotenv')
dotenv.config()
// need to auto generate the config file before importing these modules
const { generateConfig } = require('./core/config.js')

const { startServer } = require('./core/server.js')
const { getLogger } = require('./logger/config.js')
const { logger } = getLogger()
const start = async () => {
  generateConfig().then((generated) => {
    if (generated) {
      const config = require('./config/config.js')
      global.config = config
      //
      logger.info('Config file generated')
      startServer()
    } else {
      logger.error('Unable to generate config file')
    }
  })
}
//
module.exports = { start }
