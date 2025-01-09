const config = {}
config.jwt = {
  secretOrKey: 'TEA_JWT_SECRET',
  expiresIn: 'TEA_JWT_EXPIRES_IN'
}

global.config = config

module.exports = config
