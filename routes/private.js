// const asyncHandler = require('../error/route')
const { getLogger } = require('../logger/config')
// const { elpositionHandler, elspositionsHandler } = require('./handlers/privateHandlers')
const { logger } = getLogger()
const setPrivateRoutes = (app) => {
  try {
    //
  } catch (error) {
    logger.error('Unable to init private routes: ' + error)
  }
}
module.exports = setPrivateRoutes
