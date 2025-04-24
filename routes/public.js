const asyncHandler = require('../error/route.js')
const { getLogger } = require('../logger/config.js')
const { homeHandler, askMe, nstAI, mjAI } = require('./handlers/publicHandlers.js')
const { logger } = getLogger()
const setPublicRoutes = (app) => {
  try {
    // Home
    app.get('/', asyncHandler(homeHandler))
    app.post('/api/askMe', asyncHandler(askMe))
    app.post('/api/nst-ai', asyncHandler(nstAI))
    app.post('/api/mjai-ai', asyncHandler(mjAI))
  } catch (error) {
    logger.error('Unable to init routes: ' + error)
  }
}
module.exports = setPublicRoutes
