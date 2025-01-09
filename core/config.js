const fs = require('fs')
const path = require('path')
const { envKeys } = require('../constants/envKeysToReplace.js')

const checkIfConfigExists = (file) => {
  const config = path.join(__dirname, file)
  return new Promise((resolve, reject) => {
    fs.access(config, fs.constants.F_OK, (err) => {
      if (err) {
        resolve(false)
      } else {
        resolve(true)
      }
    })
  })
}

const createConfig = (file) => {
  const config = path.join(__dirname, file)
  return new Promise((resolve, reject) => {
    fs.writeFile(config, '', (err) => {
      if (err) {
        resolve(false)
      } else {
        resolve(true)
      }
    })
  })
}

const generateConfigFile = (exampleFile, configFile) => {
  const exampleConfig = path.join(__dirname, exampleFile)
  const config = path.join(__dirname, configFile)
  return new Promise((resolve, reject) => {
    fs.readFile(exampleConfig, 'utf8', (err, data) => {
      if (err) {
        resolve(false)
      } else {
        const cfData = data.replace(
          new RegExp(envKeys.join('|'), 'g'),
          (match) => process.env[match]
        )

        fs.writeFile(config, cfData, (err) => {
          if (err) {
            resolve(false)
          } else {
            resolve(true)
          }
        })
      }
    })
  })
}

const generateConfig = async () => {
  return new Promise(async (resolve, reject) => {
    checkIfConfigExists('../config/config.js').then((exists) => {
      if (exists) {
        generateConfigFile('../config/config.example.js', '../config/config.js').then((created) => {
          if (created) {
            resolve(true)
          } else {
            resolve(false)
          }
        })
      } else {
        createConfig('../config/config.js').then((created) => {
          if (created) {
            generateConfigFile('../config/config.example.js', '../config/config.js').then(
              (created) => {
                if (created) {
                  resolve(true)
                } else {
                  resolve(false)
                }
              }
            )
          } else {
            resolve(false)
          }
        })
      }
    })
  })
}

module.exports = { generateConfig }
