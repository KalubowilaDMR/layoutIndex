const DeviceModel = require('../Model/Device.model')
const LocationModel = require('../Model/Location.model')

const addLocation = async(req, res) => {
    try {
        const { name, address, phone } = req.body

        // error handling
        if (!name) {
            return res.status(400).json({error : 'Location name is required!.'})
        }
        if (!address) {
            return res.status(400).json({error : 'Location address is required!.'})
        }
        if (!phone) {
            return res.status(400).json({error : 'Phone number is required!.'})
        }

        // valid name type check regEx
        if(!/^[a-zA-Z. ]+$/.test(name)){
            return res.status(400).json({error : 'Name only accept \'.\' and characters'})
        }

        // valid phone cheack regEx
        const numericRegEx = /^[0-9]+$/
        if(!numericRegEx.test(phone)){
            return res.status(400).json({error : 'Phone number is not valid!.'})
        }
        
        // check exists address
        const existsAddress = await LocationModel.findOne({address})
        if (existsAddress) {
            return res.status(400).json({error : 'This Address already exists!.'})
        }
        
        // check exists phone number
        const existsPhone = await LocationModel.findOne({phone})
        if (existsPhone) {
            return res.status(400).json({error : 'Phone number already exists!.'})
        }

        const newLocation = new LocationModel({
            name,
            address,
            phone
        })
        const data = await newLocation.save()
        return res.status(201).json({data : data, message : 'New Location added success!.'})

    } catch (error) {
        console.error(error)
        return res.status(500).json({error : error})
    }
}

const updateLocation = async(req, res) => {
    try {
        const { name, address, phone } = req.body
        const locationId = req.params.id

        // error handling
        if (!name) {
            return res.status(400).json({error : 'Location name is required!.'})
        }
        if (!address) {
            return res.status(400).json({error : 'Location address is required!.'})
        }
        if (!phone) {
            return res.status(400).json({error : 'Phone number is required!.'})
        }
        
        // valid name type check regEx
        if(!/^[a-zA-Z. ]+$/.test(name)){
            return res.status(400).json({error : 'Name only accept \'.\' and characters'})
        }

        // valid phone cheack regEx
        const numericRegEx = /^[0-9]+$/
        if(!numericRegEx.test(phone)){
            return res.status(400).json({error : 'Phone number is not valid!.'})
        }

        // check exist location
        const existsLocation = await LocationModel.findById(locationId)
        if (!existsLocation) {
            return res.status(400).json({error : 'Not found Location!.'})
        }

        // check exists address -- $ne means mongo db check not equalto
        const existsAddress = await LocationModel.findOne({address, _id : {$ne: locationId}})
        if (existsAddress) {
            return res.status(400).json({error : 'This Address already exists!.'})
        }
        
        // check exists phone number
        const existsPhone = await LocationModel.findOne({phone, _id : {$ne : locationId}})
        if (existsPhone) {
            return res.status(400).json({error : 'Phone number already exists!.'})
        }

        // update data
        existsLocation.name = name
        existsLocation.address = address
        existsLocation.phone = phone
        const data = await existsLocation.save()
        
        return res.status(200).json({data : data, message : 'Location update success!.'})

    } catch (error) {
        console.error(error)
        return res.status(500).json({error : error})
    }
}

const getLocation = async(req, res) => {
    try {
        const locationId = req.params.id

        const existsLocation = await LocationModel.findById(locationId)
        if (!existsLocation) {
            return res.status(400).json({error : 'Location not found!.'})
        }

        return res.status(200).json({data : existsLocation})
    } catch (error) {
        console.error(error)
        return res.status(200).json({error : error})
    }
}

const getAllLocations = async(req, res) => {
    try {
        const allLocations = await LocationModel.find()
        return res.status(200).json({data : allLocations})
    } catch (error) {
        console.error(error)
        return res.status(500).json({error : error})
    }
}

const deleteLocation = async(req, res) => {
    try {
        const locationId = req.params.id

        const existLocation = await LocationModel.findById(locationId)
        if (!existLocation) {
            return res.status(400).json({error : 'Not found Location!.'})
        }

        // delete all device include on location -- $in mean check in the matches device id
        const deviceId = existLocation.devices
        await DeviceModel.deleteMany({_id : {$in : deviceId}})
        
        // delete location
        await LocationModel.findByIdAndDelete(locationId)
        return res.status(200).json({message : 'This Location all data delete success!'})
    } catch (error) {
        console.error(error)
        return res.status(500).json({error : error})
    }
}

module.exports = {
    addLocation,
    updateLocation,
    getLocation,
    getAllLocations,
    deleteLocation
}