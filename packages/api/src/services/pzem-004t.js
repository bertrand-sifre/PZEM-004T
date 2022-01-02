const pzem004t = require('pzem-004t')
const { DEBUG, SERIAL_PORT } = require('../env')

const device = new pzem004t({ path: SERIAL_PORT, debug: DEBUG })

module.exports = device