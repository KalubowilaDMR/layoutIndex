const express = require('express')
const router = express.Router()
const deviceRouters = require('./Device.router')
const locationRouters = require('./Location.router')

router.use('/location', locationRouters)
router.use('/device', deviceRouters)

module.exports = router