const DeviceModel = require('../Model/Device.model')
const LocationModel = require('../Model/Location.model')

const addDevice = async(req, res) => {
    try {
        const { serialNumber, type, image, status, locationId } = req.body

        // error handling
        if (!serialNumber){
            return res.status(400).json({error : 'Device unique serial number is required!.'})
        }
        if (!type){
            return res.status(400).json({error : 'Device type is required!.'})
        }
        if (!image){
            return res.status(400).json({error : 'Image is required!.'})
        }
        if (!status){
            return res.status(400).json({error : 'Device current status is required!.'})
        }
        if (!locationId){
            return res.status(400).json({error : 'Location ID is required!.'})
        }
        
        // check passing type is valid
        if (type !== 'pos' && type !== 'kisok' && type !== 'signage'){
            return res.status(400).json({error : 'Passing type is not valid!.'})
        }
        
        // check passing type is valid
        if (status !== 'Active' && status !== 'Inactive'){
            return res.status(400).json({error : 'Passing status is not valid!.'})
        }

        // check passing id match on db data
        const existSerialNumber = await DeviceModel.findOne({serialNumber})
        if (existSerialNumber) {
            return res.status(400).json({error : 'This Serial number already exists!.'})
        }

        // check passing id match on db data
        const existImage = await DeviceModel.findOne({image})
        if (existImage) {
            return res.status(400).json({error : 'This Image already exists!.'})
        }

        // check passing id match on db data
        const existLocation = await LocationModel.findById(locationId)
        if (!existLocation) {
            return res.status(400).json({error : 'This Location ID is not found!.'})
        }

        // check pasing device type is matching
        const validTypes = ['pos', 'kisok', 'signage']
        if(!validTypes.includes(type)){
            return res.status(400).json({error : 'Invalid device type passing!.'})
        }

        // check pasing device status is matching
        const validStatus = ['Active', 'Inactive']
        if(!validStatus.includes(status)){
            return res.status(400).json({error : 'Invalid device status passing!.'})
        }

        // no erro - data passing to db
        const newDevice = new DeviceModel({
            serialNumber,
            type,
            image,
            status
        })
        // save data to database
        const addNewDevice = await newDevice.save()

        // add device to location model's device array field
        existLocation.devices.push(addNewDevice._id)
        await existLocation.save()
        
        return res.status(201).json({data : addNewDevice, message : 'New Device added success!.'})

    } catch (error) {
        console.error(error)
        return res.status(400).json({error : error})
    }
}

const updateDevice = async(req, res) => {
    try {
        const { serialNumber, type, image, status, locationId } = req.body
        const deviceId = req.params.id

        // error handling
        if (!serialNumber){
            return res.status(400).json({error : 'Device unique serial number is required!.'})
        }
        if (!type){
            return res.status(400).json({error : 'Device type is required!.'})
        }
        if (!status){
            return res.status(400).json({error : 'Device current status is required!.'})
        }
        if (!image){
            return res.status(400).json({error : 'Device image is required!.'})
        }
        
        // check passing type is valid
        if (type !== 'pos' && type !== 'kisok' && type !== 'signage'){
            return res.status(400).json({error : 'Passing type is not valid!.'})
        }
        
        // check passing type is valid
        if (status !== 'Active' && status !== 'Inactive'){
            return res.status(400).json({error : 'Passing status is not valid!.'})
        }

        // check passing serianNumber match on db data -- $ne is not equeal
        const existSerialNumber = await DeviceModel.findOne({serialNumber, _id : {$ne : deviceId}})
        if (existSerialNumber) {
            return res.status(400).json({error : 'This Serial number already exists!.'})
        }

        // check passing image match on db data -- $ne is not equeal
        const existImage = await DeviceModel.findOne({image, _id : {$ne : deviceId}})
        if (existImage) {
            return res.status(400).json({error : 'This Serial number already exists!.'})
        }

        // check passing id match on db data
        const existsDevice = await DeviceModel.findById(deviceId)
        if (!existsDevice) {
            return res.status(400).json({error : 'This Device ID is not found!.'})
        }

        // check pasing device type is matching
        const validTypes = ['pos', 'kisok', 'signage']
        if(!validTypes.includes(type)){
            return res.status(400).json({error : 'Invalid device type passing!.'})
        }

        // check pasing device status is matching
        const validStatus = ['Active', 'Inactive']
        if(!validStatus.includes(status)){
            return res.status(400).json({error : 'Invalid device status passing!.'})
        }

        // no erro - data passing to db
        existsDevice.serialNumber = serialNumber
        existsDevice.type = type
        existsDevice.status = status
        existsDevice.image = image
        const data = await existsDevice.save()

        return res.status(200).json({data : data, message : 'Device data update success!.'})

    } catch (error) {
        console.error(error)
        return res.status(400).json({error : error})
    }
}

const getDevice = async(req, res) => {
    try {
        const deviceId = req.params.id

        // find available device
        const existsDevice = await DeviceModel.findById(deviceId)
        if (!existsDevice) { 
            return res.status(400).json({error : 'Device not found'})
        }

        return res.status(200).json({data : existsDevice, message : `Get ${existsDevice.serialNumber}'s data sucees`})      
    } catch (error) {
        console.error(error)
        return res.status(400).json({error : error})
    }
}

const getAllDevices = async(req, res) => {
    try {
        // get all data
        const allDevices = await DeviceModel.find()
        return res.status(200).json({data : allDevices})
    } catch (error) {
        console.error(error)
        return res.status(400).json({error : error})
    }
}

const deleteDevice = async(req, res) => {
    try {
        const deviceId = req.params.id

        // find available device
        const existsDevice = await DeviceModel.findById(deviceId)
        if (!existsDevice) { 
            return res.status(400).json({error : 'Device not found'})
        }

        // find available device on location model
        const deviceOnLocation = await LocationModel.findOne({devices : deviceId})
        if (deviceOnLocation) {
            // pull data from device array
            await LocationModel.updateMany({}, { $pull : { devices : deviceId } })
        }

        // delete matches device
        await DeviceModel.findByIdAndDelete(deviceId)
        return res.status(200).json({message : `This seriel number - (${existsDevice.serialNumber}) data deleted success!.`})
    } catch (error) {
        console.error(error)
        return res.status(400).json({error : error})
    }
}

module.exports = {
    addDevice,
    updateDevice,
    getDevice,
    getAllDevices,
    deleteDevice
}