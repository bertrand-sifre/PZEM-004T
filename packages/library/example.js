const pzem004t = require('./index');

(async () => {
  const device = new pzem004t({ path: "COM6", debug: true })
  // let datas = await device.getMeasurements()
  // console.log(datas)

  let datas = await device.getVoltage()
  console.log(datas)

  // datas = await device.getCurrent()
  // console.log(datas)

  // datas = await device.getPower()
  // console.log(datas)

  await device.resetEnergy()
  datas = await device.getEnergy()
  console.log(datas)

  // datas = await device.getFrequency()
  // console.log(datas)

  // datas = await device.getPowerFactor()
  // console.log(datas)

  // datas = await device.getAlarm()
  // console.log(datas)

  datas = await device.getAlarmThresold()
  console.log(datas)

  // datas = await device.getAddress()
  // console.log(datas)

  device.close()
})()