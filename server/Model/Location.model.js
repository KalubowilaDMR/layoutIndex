const mongoose = require('../Utils/db')

const locationSchema = new mongoose.Schema({
    name : {
        type : String,
        nullable : false,
        required : true
    },
    address : {
        type : String,
        nullable : false,
        unique : true
    },
    phone : {
        type : String,
        nullable : false,
        unique : true
    },
    devices : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Device',
        nullable : true,
    }]
})

const LocationModel = mongoose.model('Location', locationSchema)

module.exports = LocationModel