const SerialPort = require('serialport')
const { toAlarm, toCurrent, toEnergy, toFrequency, toPower, toPowerFactor, toVoltage } = require('./bufferDecode')
const { read, concatBuffer } = require('./privateFunction')
/**
 * @typedef {Object} options
 * @property {string} path - The path of serial port | COM1 on windows
 * @property {boolean} [debug] - Enable debug mode
 * @property {number} [address] - address of slave default 0x01, max 0xF7
 * @property {number} [timeout] - timeout to get response in ms
 */

/**
 * @param {options} options 
 */
const pzem004t = function (options) {
  this.path = options.path
  this.debug = options.debug || false
  this.port = new SerialPort(this.path, { baudRate: 9600, parity: 'none', stopBits: 1, dataBits: 8 })
  this.port.on('data', concatBuffer)
  if (this.debug) console.log('Connected to ', this.path)
  this.address = options.address || 1
  this.timeout = options.timeout || 10
}

pzem004t.prototype.readAllData = async function () {
  const responseBuffer = await read(this, Buffer.from([this.address, 0x04, 0x00, 0x00, 0x00, 0x0A, 0x00, 0x00]))// read 10 registers
  // now decode buffer data
  return {
    voltage: toVoltage(responseBuffer.slice(3)),
    current: toCurrent(responseBuffer.slice(5)),
    power: toPower(responseBuffer.slice(9)),
    energy: toEnergy(responseBuffer.slice(13)),
    frequency: toFrequency(responseBuffer.slice(17)),
    powerFactor: toPowerFactor(responseBuffer.slice(19)),
    alarm: toAlarm(responseBuffer.slice(21))
  }
}

pzem004t.prototype.close = function () {
  return this.port.close()
}

module.exports = pzem004t
