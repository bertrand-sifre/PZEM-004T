const pzem004t = require('./index');

(async () => {
  const device = new pzem004t({ path: "COM7", debug: true })
  let datas = await device.getMeasurements()
  console.log(datas)

  datas = await device.getVoltage()
  console.log(datas)

  datas = await device.getCurrent()
  console.log(datas)

  datas = await device.getPower()
  console.log(datas)

  datas = await device.getEnergy()
  console.log(datas)

  datas = await device.getFrequency()
  console.log(datas)

  datas = await device.getPowerFactor()
  console.log(datas)

  datas = await device.getAlarm()
  console.log(datas)

  device.close()
})()