const SerialPort = require('serialport')
const { toAddress, toAlarm, toAlarmThresold, toCurrent, toEnergy, toFrequency, toPower, toPowerFactor, toVoltage } = require('./bufferDecode')
const { read, concatBuffer } = require('./privateFunction')
/**
 * @typedef {Object} options
 * @property {string} path - The path of serial port | COM1 on windows
 * @property {boolean} [debug] - Enable debug mode
 * @property {number} [address] - address of slave default 0x01, max 0xF7
 */

/**
 * @param {options} options 
 */
const pzem004t = function (options) {
  this.path = options.path
  this.debug = options.debug || false
  this.address = options.address || 1
}

pzem004t.prototype.connect = function () {
  this.port = new SerialPort(this.path, { baudRate: 9600, parity: 'none', stopBits: 1, dataBits: 8 })
  this.port.on('data', concatBuffer)
  if (this.debug) console.log('Connected to serial:', this.path)
}

pzem004t.prototype.getMeasurements = async function () {
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

pzem004t.prototype.getVoltage = async function () {
  const responseBuffer = await read(this, Buffer.from([this.address, 0x04, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00]))
  return toVoltage(responseBuffer.slice(3))
}

pzem004t.prototype.getCurrent = async function () {
  const responseBuffer = await read(this, Buffer.from([this.address, 0x04, 0x00, 0x01, 0x00, 0x02, 0x00, 0x00]))
  return toCurrent(responseBuffer.slice(3))
}

pzem004t.prototype.getPower = async function () {
  const responseBuffer = await read(this, Buffer.from([this.address, 0x04, 0x00, 0x03, 0x00, 0x02, 0x00, 0x00]))
  return toPower(responseBuffer.slice(3))
}

pzem004t.prototype.getEnergy = async function () {
  const responseBuffer = await read(this, Buffer.from([this.address, 0x04, 0x00, 0x05, 0x00, 0x02, 0x00, 0x00]))
  return toEnergy(responseBuffer.slice(3))
}

pzem004t.prototype.getFrequency = async function () {
  const responseBuffer = await read(this, Buffer.from([this.address, 0x04, 0x00, 0x07, 0x00, 0x01, 0x00, 0x00]))
  return toFrequency(responseBuffer.slice(3))
}

pzem004t.prototype.getPowerFactor = async function () {
  const responseBuffer = await read(this, Buffer.from([this.address, 0x04, 0x00, 0x08, 0x00, 0x01, 0x00, 0x00]))
  return toPowerFactor(responseBuffer.slice(3))
}

pzem004t.prototype.getAlarm = async function () {
  const responseBuffer = await read(this, Buffer.from([this.address, 0x04, 0x00, 0x09, 0x00, 0x02, 0x00, 0x00]))
  return toAlarm(responseBuffer.slice(3))
}

pzem004t.prototype.getAlarmThresold = async function () {
  const responseBuffer = await read(this, Buffer.from([this.address, 0x03, 0x00, 0x01, 0x00, 0x01, 0x00, 0x00]))
  return toAlarmThresold(responseBuffer.slice(3))
}

pzem004t.prototype.getAddress = async function () {
  const responseBuffer = await read(this, Buffer.from([this.address, 0x03, 0x00, 0x02, 0x00, 0x01, 0x00, 0x00]))
  return toAddress(responseBuffer.slice(3))
}

/**
 * @param {number} value new alarm thresold value in watt, must be between [0; 65535]
 */
pzem004t.prototype.setAlarmThresold = async function (value) {
  if (!Number.isInteger(value)) {
    throw new Error('The value must be an integer')
  }
  if (value < 0 || value > 65535) {
    throw new Error('The value must be between [0; 65535]')
  }
  const buf = Buffer.from([this.address, 0x06, 0x00, 0x01, 0x00, 0x00, 0x00, 0x00])
  buf.writeUInt16BE(value, 4)
  const responseBuffer = await read(this, buf)
  return buf.compare(responseBuffer) === 0
}

/**
 * @param {number} value new address value, must be between [1; 247]
 */
pzem004t.prototype.setAddress = async function (value) {
  if (!Number.isInteger(value)) {
    throw new Error('The value must be an integer')
  }
  if (value < 0 || value > 247) {
    throw new Error('The value must be between [0; 247]')
  }
  const buf = Buffer.from([this.address, 0x06, 0x00, 0x02, 0x00, 0x00, 0x00, 0x00])
  buf.writeUInt16BE(value, 4)
  const responseBuffer = await read(this, buf)
  return buf.compare(responseBuffer) === 0
}

pzem004t.prototype.resetEnergy = async function () {
  const buf = Buffer.from([this.address, 0x42, 0x00, 0x00])
  const responseBuffer = await read(this, buf)
  return buf.compare(responseBuffer) === 0
}

/**
 * Calibration method, Warning it's a broadcast method.
 * Takes 3 to 4 seconds. 
 */
pzem004t.prototype.calibration = async function () {
  const buf = Buffer.from([0xF8, 0x41, 0x37, 0x21, 0x00, 0x00])
  const responseBuffer = await read(this, buf)
  return buf.compare(responseBuffer) === 0
}

pzem004t.prototype.close = function () {
  return this.port.close()
}

module.exports = pzem004t
