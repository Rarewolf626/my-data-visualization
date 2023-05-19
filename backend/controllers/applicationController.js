//Really repetitive code... Could have done it better with more time haha

const fs = require('fs');
const path = require('path')
const bufferTreatment = require('../utils/bufferTreatment')
var iconExtractor = require('icon-extractor');
let gbImg;

const filePath = path.join(__dirname, '..', '..', 'volatile', 'unpolishedData.json')

iconExtractor.emitter.on('icon', function(data){
    gbImg = data.Base64ImageData;
  });

const findHighestConsuming = async (req, res) => {
    const readJson = fs.readFileSync(filePath, () => { console.log('read') })
    const json = JSON.parse(readJson)
    const mostRecentJsonRegister = json[json.length - 1]

    const consumingDataApplications = Object.values(mostRecentJsonRegister)

    const values = [];
    for (let i = 0; i < consumingDataApplications.length; i++) {
  
      const currentApplicationDownload = consumingDataApplications[i].download
      const applicationDownloadInBytes = bufferTreatment.convertToBytes(currentApplicationDownload)

      let parsedCurrentApplicationDownload = Number(applicationDownloadInBytes)

      values.push(parsedCurrentApplicationDownload)

    }
    const max = Math.max(...values)
    const maxValueIndex = values.indexOf(max);
    let maxValue;
    if (consumingDataApplications[maxValueIndex] != undefined){
        maxValue = consumingDataApplications[maxValueIndex]
        iconExtractor.getIcon(maxValue.name, maxValue.path);
        res.status(200).json({name: maxValue.name, download: maxValue.download, img: gbImg}) 
    }else{
        res.status(200).json({name: 'Carregando', download: '...'}) 
    }
}

const getDownloadSum = async (req, res) => {
    const readJson = fs.readFileSync(filePath, () => { console.log('read') })
    const json = JSON.parse(readJson)
    const mostRecentJsonRegister = json[json.length - 1]
    let downloadSum = 0;

    const consumingDataApplications = Object.values(mostRecentJsonRegister)
    for (let i = 0; i < consumingDataApplications.length; i++) {
      const currentApplicationDownload = consumingDataApplications[i].download
      const applicationDownloadInBytes = bufferTreatment.convertToBytes(currentApplicationDownload)
      const parsedCurrentApplicationDownload = Number(applicationDownloadInBytes)
      downloadSum += parsedCurrentApplicationDownload;
    }
    downloadSum = Math.round(downloadSum * 100) / 100;
    if (downloadSum != 0){
        res.status(200).json({name: 'Quantidade total de download:', download: downloadSum}) 
    }else{
        res.status(200).json({name: 'Carregando', download: '...'}) 
    }
}

const getUploadSum = async (req, res) => {
    const readJson = fs.readFileSync(filePath, () => { console.log('read') })
    const json = JSON.parse(readJson)
    const mostRecentJsonRegister = json[json.length - 1]
    let uploadSum = 0;

    const consumingDataApplications = Object.values(mostRecentJsonRegister)
    for (let i = 0; i < consumingDataApplications.length; i++) {
      const currentApplicationUpload = consumingDataApplications[i].upload
      const applicationUploadInBytes = bufferTreatment.convertToBytes(currentApplicationUpload)
      const parsedCurrentApplicationUpload = Number(applicationUploadInBytes)
      uploadSum += parsedCurrentApplicationUpload;
    }
    uploadSum = Math.round(uploadSum * 100) / 100;
    if (uploadSum != 0){
        res.status(200).json({name: 'Quantidade total de upload:', upload: uploadSum}) 
    }else{
        res.status(200).json({name: 'Carregando', upload: '...'}) 
    }
}

const getAllApplications = async (req, res) => {
    const readJson = fs.readFileSync(filePath, () => { console.log('read') })
    const json = JSON.parse(readJson)
    const mostRecentJsonRegister = json[json.length - 1]
    let consumingDataApplications = Object.values(mostRecentJsonRegister)

    for (let i = 0; i < consumingDataApplications.length; i++) {
      const currentApplicationDownload = consumingDataApplications[i].download
      const applicationDownloadInBytes = Number(bufferTreatment.convertToBytes(currentApplicationDownload))
      consumingDataApplications[i].download = applicationDownloadInBytes;
    }

    const sortedArray = consumingDataApplications.sort((a, b) => {
        const downloadA = parseFloat(a.download.match(/[0-9.]+/)[0]);
        const downloadB = parseFloat(b.download.match(/[0-9.]+/)[0]);
        return downloadA - downloadB;
      });

    if (sortedArray[0].download != undefined){
        //iconExtractor.getIcon(maxValue.name, maxValue.path);
        res.status(200).json({sortedApplications: sortedArray}) 
    }else{
        res.status(200).json({name: 'Carregando', download: '...'}) 
    }
}




  
module.exports = {
    findHighestConsuming,
    getDownloadSum,
    getUploadSum,
    getAllApplications
}