const asyncHandler = require('../error/route.js')
const { getLogger } = require('../logger/config.js')
const { homeHandler, askMe } = require('./handlers/publicHandlers.js')
const { logger } = getLogger()
const setPublicRoutes = (app) => {
  try {
    // Home
    app.get('/', asyncHandler(homeHandler))
    app.post('/api/askMe', asyncHandler(askMe))
  } catch (error) {
    logger.error('Unable to init routes: ' + error)
  }
}
module.exports = setPublicRoutes
