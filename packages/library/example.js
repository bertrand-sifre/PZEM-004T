const pzem004t = require('./index');

(async () => {
  const device = new pzem004t({ path: "COM7", debug: true })
  const datas = await device.readAllData()
  console.log(datas)
  device.close()
})()