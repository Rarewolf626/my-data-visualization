//TODO: launch build vite before npm start
const { app, BrowserWindow } = require('electron');
const net = require('net');
const cp = require('child_process');
const fs = require('fs');
const path = require('path');
const bufferTreatment = require('./backend/utils/bufferTreatment')

const unpolishedDataPath = path.join(__dirname, 'volatile', 'unpolishedData.json');
const trafficAnalyzerScriptPath = path.join(__dirname, 'src', 'connection')

cp.exec(`cd ${trafficAnalyzerScriptPath} && pm2 start traffic_analyzer.py`)

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  setTimeout(() => {
    const client = net.connect(50000, '127.0.0.1', () => {
      console.log('Connected to server');
    });

    client.on('data', (data) => {
      const json = JSON.stringify(bufferTreatment.getJsonFromAnalyzer(data));
      const result = bufferTreatment.addAnotherJsonInput(unpolishedDataPath, json)
      console.log('resultado >>>>')
      console.log(result)

      let rawdata = fs.readFileSync(unpolishedDataPath, () => { console.log('leu') })

      console.log('raw >>>' + rawdata)

      let person = JSON.parse(rawdata)
      const lastRegister = person[person.length - 1]

      console.log(lastRegister)

      const applications = Object.values(lastRegister)
      console.log(applications.length)

      const values = [];
      for (let i = 0; i < applications.length; i++) {
        console.log('Application >>>>>>')
        console.log(applications[i])


        let download = applications[i].download.slice(0, applications[i].download.indexOf('.') + 2);


        let parsedDownload = Number(download)

        values.push(parsedDownload)
        console.log(parsedDownload)
        console.log(download)

      }
      console.log(values)

      console.log(Math.max(...values))
      const max = Math.max(...values)
      console.log("Consumindo mais >>>>>>")
      if (applications[values.indexOf(max)] != undefined)
        console.log(applications[values.indexOf(max)].name)

      //console.log(applications[0])






    });

  }, 5000) //Application needs this delay in order to python execute



  win.loadFile(path.join(__dirname, 'dist', 'index.html'))
}

app.whenReady().then(() => {
  createWindow()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})




console.log("Hello World")
