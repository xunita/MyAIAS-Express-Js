const winston = require('winston')
const path = require('path')

const consoleFormat = new winston.transports.Console({
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), // Customize date format
    winston.format.printf(({ timestamp, level, message }) => {
      return `[${timestamp} (GMT+0)] ${level.toUpperCase()}: ${message}`
    })
  )
})

const systemLogFormat = new winston.transports.File({
  filename: path.join(__dirname, '../logs', 'system.log'),
  level: 'info'
})

const systemErrorLogFormat = new winston.transports.File({
  filename: path.join(__dirname, '../logs', 'system.error.log'),
  level: 'error'
})

const transports = [consoleFormat, systemLogFormat, systemErrorLogFormat]

class Logger {
  constructor() {
    this.logger = winston.createLogger({
      format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), // Customize date format
        winston.format.printf(({ timestamp, level, message }) => {
          return `[${timestamp} (GMT+0)] ${level.toUpperCase()}: ${message}`
        })
      ),
      //   defaultMeta: { service: 'user-service' },
      transports: [consoleFormat, systemLogFormat, systemErrorLogFormat]
    })
  }

  addTransport(transport) {
    if (transports.includes(transport) && !this.logger.transports.includes(transport)) {
      this.logger.add(transport)
    }
  }

  removeTransport(transport) {
    if (this.logger.transports.includes(transport)) {
      this.logger.remove(transport)
    }
  }
}

const getLogger = () => {
  if (!global.logger) global.logger = new Logger()
  return { log: global.logger, logger: global.logger.logger }
}

module.exports = { getLogger, systemErrorLogFormat, systemLogFormat, consoleFormat }
