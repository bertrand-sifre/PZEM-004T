const { crc16modbus } = require('crc')

/** @type {Buffer} */
let buffer = undefined
/** @type {(Buffer) => void} */
let promiseResolve
/** @type {Promise<Buffer>} */
const promise = new Promise((resolve) => promiseResolve = resolve)
/**
 * @param {Buffer} data 
 */
module.exports.concatBuffer = function (data) {
  if (buffer === undefined) {
    buffer = data
  } else {
    buffer = Buffer.concat([buffer, data])
  }
  if (isValid()) {
    promiseResolve(buffer)
  }
}

const isValid = function () {
  const length = buffer.length - 2
  if (length < 1) {
    return false
  }
  const crc = crc16modbus(buffer.slice(0, length))
  return crc === buffer.readUInt16LE(length)
}

/**
 * @param {import('./index')} pzem 
 * @param {Buffer} data 
 */
module.exports.read = async function (pzem, data) {
  const crc = crc16modbus(data.slice(0, 6))
  data.writeUInt16LE(crc, 6)
  if (pzem.debug) console.log('tx:', data.toString('hex'))
  buffer = undefined // clear buffer
  pzem.port.write(data)
  const response = await promise
  if (pzem.debug) console.log('rx:', response.toString('hex'))
  return response
}