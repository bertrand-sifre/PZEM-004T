const SERIAL_PORT = process.env.SERIAL_PORT
const LISTEN_PORT = process.env.LISTEN_PORT || 3000
const DEBUG = process.env.DEBUG === 'true'

if (!SERIAL_PORT) {
  console.error('No var env SERIAL_PORT')
  process.exit(-1)
}

module.exports = {
  SERIAL_PORT,
  LISTEN_PORT,
  DEBUG,
}