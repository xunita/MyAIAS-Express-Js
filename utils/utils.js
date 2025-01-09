let counter = 0
/* eslint-disable no-undef */
const bcrypt = require('bcrypt')
/**
 * Decodes a base64 encoded string or an object with base64 encoded attributes.
 * If the input is an object, it decodes all attributes and returns the modified object.
 * If the input is a string, it decodes the string and returns the decoded value.
 *
 * @param {string|object} data - The base64 encoded string or object to decode.
 * @returns {string|object} - The decoded value or object.
 */
const base64Decode = (data) => {
  // check if object then decode all attributes
  if (typeof data === 'object') {
    for (let key in data) {
      data[key] = Buffer.from(data[key], 'base64').toString('utf-8')
    }
    return data
  }
  return Buffer.from(data, 'base64').toString('utf-8')
}

/**
 * Encodes the given data to base64.
 * If the data is an object, it encodes all attributes.
 *
 * @param {string|object} data - The data to be encoded.
 * @returns {string|object} - The encoded data.
 */
const base64Encode = (data) => {
  // check if object then encode all attributes
  if (typeof data === 'object') {
    for (let key in data) {
      data[key] = Buffer.from(data[key]).toString('base64')
    }
    return data
  }
  return Buffer.from(data).toString('base64')
}

const hasEmailOrUsername = (reqBody) => {
  return !!reqBody.email || !!reqBody.username
}

const hashVerified = (password, hash) => {
  return bcrypt.compareSync(password, hash)
}

const txId = () => {
  return new Date(Date.now()).getTime()
}

const txIdV2 = () => {
  const now = Date.now()
  counter = (counter + 1) % 1000 // Increment counter and reset after 999
  return `${now}${counter.toString().padStart(3, '0')}` // Combine timestamp and counter
}

// Generate a 6 digit code
const generateVerificationCode = () => {
  return Math.floor(100000 + Math.random() * 900000)
}

const isLength = (str, { min = 0, max = undefined }) => {
  if (str === undefined || str === null) {
    return false
  }
  return str.length >= min && (max === undefined || str.length <= max)
}

const addHoursToday = (hours) => {
  return new Date(
    Date.now() + (typeof hours === 'number' ? hours * 60 * 60 * 1000 : 0 * 60 * 60 * 1000)
  )
}

const sleepMyAIAS = (ms, ...args) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve({ done: true, args })
    }, ms)
  })

const getStringAfter = (str, delimiter) => {
  const index = str.indexOf(delimiter)
  return index === -1 ? '' : str.substring(index + 1)
}

const base64ToBlob = (base64, contentType = '') => {
  const byteCharacters = atob(base64.split(',')[1])
  const byteArrays = []
  for (let offset = 0; offset < byteCharacters.length; offset += 512) {
    const slice = byteCharacters.slice(offset, offset + 512)
    const byteNumbers = new Array(slice.length).fill(0).map((_, i) => slice.charCodeAt(i))
    byteArrays.push(new Uint8Array(byteNumbers))
  }
  return new Blob(byteArrays, { type: contentType })
}

module.exports = {
  base64Decode,
  base64Encode,
  hashVerified,
  hasEmailOrUsername,
  txId,
  generateVerificationCode,
  isLength,
  addHoursToday,
  getStringAfter,
  base64ToBlob,
  txIdV2,
  sleepMyAIAS
}
