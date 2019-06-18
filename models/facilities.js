const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);

const facilitySchema = new Schema({
    name: {
        type: String,
        min: 1,
        max: 5,
        required: true
    },
    availability: {
        type: Boolean,
        default: false
    }


}, {
        timestamps: true
    })
    

var facilities = mongoose.model("facility", facilitySchema);
module.exports = facilities;

