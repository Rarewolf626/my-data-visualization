const fs = require('fs')
const path = require('path')


let rawdata = fs.readFileSync('../../volatile/unpolishedData.json', () => { console.log('leu')})

console.log('raw >>>' + rawdata)

let unpolishedData = JSON.parse(rawdata)
let lastInfo = unpolishedData[unpolishedData.length - 1]

let highestDownload = Object.values(lastInfo)[0]

console.log(highestDownload)

module.exports