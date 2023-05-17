const { app, BrowserWindow } = require('electron');
const net = require('net');

const path = require('path')
console.log(__dirname)
const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  const client = net.connect(50000, '127.0.0.1', () => {
    console.log('Connected to server');
  });

  client.on('data', (data) => {
    console.log(data.toString())
  });

  win.loadFile(path.join(__dirname, 'dist', 'index.html'))
}

app.whenReady().then(() => {
  createWindow()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})




console.log("Hello World")
