import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Sidebar from './components/Sidebar/Sidebar'
import Api from './services/api'

function App() {
  const [count, setCount] = useState()

  async function call(){
    await Api.findHighestConsuming().then(
      (result) => {
        console.log(result.data.name)
        console.log(result.data.download)
        setCount(result.data.name + result.data.download) 
      }
    )
  }
  setTimeout(() => {
    call();
  }, 1000);
  return (
    <>
    
      <div>
        {
          count
        }
      </div>
    
    <Sidebar />
    </>
  )
}

export default App
