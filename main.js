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
    const bufferArray = data.toJSON().data;
    
    //98 is the ASCII code for the letter b (the data object starts with the letter b)
    const arrayFirstIndex = bufferArray.indexOf(98);
    //39 is index of single comma (last index of the json we want)
    const arrayLastIndex =  bufferArray.lastIndexOf(39)

    const dataArray = bufferArray.slice(arrayFirstIndex + 2, arrayLastIndex); 
    const stringFromBuffer = String.fromCharCode.apply(null, dataArray);

    const jsonFromString = JSON.parse(stringFromBuffer);
    console.log(jsonFromString)
  });

  //TODO: launch build vite before npm start
  //TODO: figure out a way to launch the python file

  win.loadFile(path.join(__dirname, 'dist', 'index.html'))
}

app.whenReady().then(() => {
  createWindow()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})




console.log("Hello World")
