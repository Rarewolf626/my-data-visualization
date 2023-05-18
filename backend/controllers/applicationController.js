const fs = require('fs');
const path = require('path')
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


      let currentApplicationDownload = consumingDataApplications[i].download.slice(0, consumingDataApplications[i].download.indexOf('.') + 2);


      let parsedCurrentApplicationDownload = Number(currentApplicationDownload)

      values.push(parsedCurrentApplicationDownload)
      console.log(parsedCurrentApplicationDownload)

    }
    console.log(values)
    console.log(Math.max(...values))
    const max = Math.max(...values)
    const maxValueIndex = values.indexOf(max);
    let maxValueName;
    if (consumingDataApplications[maxValueIndex] != undefined){
        maxValueName = consumingDataApplications[maxValueIndex].name
        console.log(maxValueName)
    }
    res.status(200).json({data: maxValueName}) 
}

module.exports = {
    findHighestConsuming,
}