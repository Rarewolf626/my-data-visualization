const fs = require('fs');

function findHighestConsuming(filePath){
    
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
    console.log("Consumindo mais >>>>>>")
    if (consumingDataApplications[maxValueIndex] != undefined){
        console.log(consumingDataApplications[maxValueIndex].name)
    }
}

module.exports = {
    findHighestConsuming,
}