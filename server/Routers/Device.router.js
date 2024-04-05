const express = require('express')
const deviceRouters = express.Router()
const {
    addDevice,
    updateDevice,
    getDevice,getAllDevices,
    deleteDevice
} = require('../Controller/Device.controller')

deviceRouters.post('/add-device', addDevice)
deviceRouters.put('/update-device/:id', updateDevice)
deviceRouters.get('/get-device/:id', getDevice)
deviceRouters.get('/all-devices', getAllDevices)
deviceRouters.delete('/delete-device/:id', deleteDevice)

module.exports = deviceRouters