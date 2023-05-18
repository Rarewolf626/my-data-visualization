const fs = require('fs');
const path = require('path')
const bufferTreatment = require('../utils/bufferTreatment')

const findHighestConsuming = async (req, res) => {
    console.log("DIRNAME >>>>" )
    const filePath = path.join(__dirname, '..', '..', 'volatile', 'unpolishedData.json')
    const readJson = fs.readFileSync(filePath, () => { console.log('leu') })
    const json = JSON.parse(readJson)
    const mostRecentJsonRegister = json[json.length - 1]

    console.log(mostRecentJsonRegister)

    const consumingDataApplications = Object.values(mostRecentJsonRegister)
    console.log(consumingDataApplications.length)

    const values = [];
    for (let i = 0; i < consumingDataApplications.length; i++) {
      console.log('Application >>>>>>')
      console.log(consumingDataApplications[i])


      const currentApplicationDownload = consumingDataApplications[i].download
      const applicationDownloadInBytes = bufferTreatment.convertToBytes(currentApplicationDownload)

      let parsedCurrentApplicationDownload = Number(applicationDownloadInBytes)

      values.push(parsedCurrentApplicationDownload)
      console.log(parsedCurrentApplicationDownload)

    }
    console.log(values)
    console.log(Math.max(...values))
    const max = Math.max(...values)
    const maxValueIndex = values.indexOf(max);
    let maxValue;
    if (consumingDataApplications[maxValueIndex] != undefined){
        maxValue = consumingDataApplications[maxValueIndex]
        console.log(maxValue)
    }
    res.status(200).json({name: maxValue.name, download: maxValue.download}) 
}

module.exports = {
    findHighestConsuming,
}