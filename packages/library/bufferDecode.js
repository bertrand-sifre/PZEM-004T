
/**
 * @param {Buffer} buffer 
 */
module.exports.toVoltage = function (buffer) {
  return buffer.readUInt16BE() / 10
}

/**
 * @param {Buffer} buffer 
 */
module.exports.toCurrent = function (buffer) {
  return buffer.readUInt16BE() / 1000 + buffer.readUInt16BE(2) / 10
}

/**
 * @param {Buffer} buffer 
 */
module.exports.toPower = function (buffer) {
  return buffer.readUInt16BE() / 10 + buffer.readUInt16BE(2) * 10
}

/**
 * @param {Buffer} buffer 
 */
module.exports.toEnergy = function (buffer) {
  return buffer.readUInt16BE(0) + buffer.readUInt16BE(2) * 100
}

/**
 * @param {Buffer} buffer 
 */
module.exports.toFrequency = function (buffer) {
  return buffer.readUInt16BE(0) / 10
}

/**
 * @param {Buffer} buffer 
 */
/**
 * @param {Buffer} buffer 
 */
module.exports.toPowerFactor = function (buffer) {
  return buffer.readUInt16BE(0) / 100
}

/**
 * @param {Buffer} buffer 
 */
module.exports.toAlarm = function (buffer) {
  return buffer.slice(0, 2).compare(Buffer.from([0xFF, 0xFF])) === 0
}