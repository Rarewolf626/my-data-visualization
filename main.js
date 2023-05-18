//TODO: launch build vite before npm start
const { app, BrowserWindow } = require('electron');
const net = require('net');
const shell = require('child_process');
const fs = require('fs');
const path = require('path');
const bufferTreatment = require('./backend/utils/bufferTreatment')
const applicationController = require('./backend/controllers/applicationController')

const unpolishedDataPath = path.join(__dirname, 'volatile', 'unpolishedData.json');
const trafficAnalyzerScriptPath = path.join(__dirname, 'src', 'connection')
const backendScriptPath = path.join(__dirname, 'backend')

shell.exec(`cd ${trafficAnalyzerScriptPath} && pm2 start traffic_analyzer.py`)

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      webSecurity: false
    }
  })

  setTimeout(() => {
    shell.exec(`cd ${backendScriptPath} && pm2 start index.js`)

    const client = net.connect(50000, '127.0.0.1', () => {
      console.log('Connected to server');
    });

    client.on('data', (data) => {
      const json = JSON.stringify(bufferTreatment.getJsonFromAnalyzer(data));
      const result = bufferTreatment.addAnotherJsonInput(unpolishedDataPath, json);
      //applicationController.findHighestConsuming(unpolishedDataPath)
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
