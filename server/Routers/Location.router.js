const express = require('express')
const locationRouters = express.Router()
const {
    addLocation,
    updateLocation,
    getLocation,
    getAllLocations,
    deleteLocation
} = require('../Controller/Location.controller')

locationRouters.post('/add-location', addLocation)
locationRouters.put('/update-location/:id', updateLocation)
locationRouters.get('/get-location/:id', getLocation)
locationRouters.get('/all-locations', getAllLocations)
locationRouters.delete('/delete-location/:id', deleteLocation)

module.exports = locationRouters