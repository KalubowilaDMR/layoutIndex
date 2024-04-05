const mongoose = require('../Utils/db')

const deviceSchema = new mongoose.Schema({
    serialNumber : {
        type : String,
        unique : true,
        required : true
    },
    type : {
        type : String,
        enum : ['pos', 'kisok', 'signage'],
        default : 'pos',
        required : true
    },
    image : {
        type : String,
        unique : true
    },
    status : {
        type : String,
        enum : ['Active', 'Inactive'],
        default : 'Active'
    }
})

const DeviceModel = mongoose.model('Device', deviceSchema)

module.exports = DeviceModel