const { checkCrc, pushCrc } = require('./crc')

/** @type {Buffer} */
let buffer = undefined
/** @type {(Buffer) => void} */
let promiseResolve
/**
 * @param {Buffer} data 
 */
module.exports.concatBuffer = function (data) {
  if (buffer === undefined) {
    buffer = data
  } else {
    buffer = Buffer.concat([buffer, data])
  }
  if (checkCrc(buffer)) {
    promiseResolve(buffer)
  }
}

/**
 * @param {import('./index')} pzem 
 * @param {Buffer} data 
 */
module.exports.read = async function (pzem, data) {
  pushCrc(data)
  if (pzem.debug) console.log('tx:', data.toString('hex'))
  buffer = undefined // clear buffer
  pzem.port.write(data)
  /** @type {Promise<Buffer>} */
  const promise = new Promise((resolve) => promiseResolve = resolve)
  const response = await promise
  if (pzem.debug) console.log('rx:', response.toString('hex'))
  return response
}