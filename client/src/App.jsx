import { Routes, Route } from 'react-router-dom'
import './App.css'
import { Toaster } from 'react-hot-toast'
import Device from './pages/device'
import Location from './pages/location'
import Navbar from './components/navbar'
import DeviceDetails from './pages/deviceDetails'

function App() {

  return (
    <>
      <Toaster position='top-center' reverseOrder={false}/>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Location/>}/>
        <Route path='/device' element={<Device/>}/>
        <Route path='/device-details/:id' element={<DeviceDetails/>}/>
      </Routes>
    </>
  )
}

export default App
