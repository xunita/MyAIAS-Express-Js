const { getLogger } = require('../logger/config.js')
const { logger } = getLogger()
const { SERVER_PORT } = require('../constants/ports.js')
//
const startServer = async () => {
  //
  const { errorHandler } = require('../error/handler.js')
  const { setProcessException } = require('../error/process.js')
  // const allowOrigins = require('../middleware/authorizedOrigins.js')
  const setPublicRoutes = require('../routes/public.js')
  const cors = require('cors')
  const bodyParser = require('body-parser')
  const setPrivateRoutes = require('../routes/private.js')
  //
  const express = require('express')
  const app = express()
  // Enable cors with allowed origins
  app.use(
    cors({
      origin: '*'
    })
  )
  // Json parser
  app.use(bodyParser.json())
  // set process error handler
  setProcessException()
  // set public routes
  setPublicRoutes(app)
  // set private routes
  setPrivateRoutes(app)
  // error handler (routes level)
  app.use(errorHandler)
  // start the server
  app.listen(SERVER_PORT, '0.0.0.0', async () => {
    //
    logger.info(`myaias server started on port: ${SERVER_PORT}`)
  })
}
module.exports = { startServer }
