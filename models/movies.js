const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;
const facilities = require('./facilities');

const commentSchema = new Schema({
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    comment: {
        type: String,
        required: true
    },    author: {
        type: String,
        required: true
    },
}, {
        timestamps: true
    })

const movieSchema = new Schema({
    name: {
        required: true,
        type: String,
        unique: true
    },
    description: {
        required: true,
        type: String
    },
    image: {
       type: String,
       required: true
    },
    category: {
        type: String,
        required: true
    },
    label: {
        type: String,
        default: ''
    },
    price: {
       type: Currency,
       required: true,
       min: 0
    },
    featured: {
       type: Boolean,
       default: false

    },

    comments: [commentSchema],
    facilities: {
        type: Schema.Types.ObjectId, 
        ref: 'facilities', 
        required: true
    }
},
    {
        timestamps: true
    })

    
var movies = mongoose.model("movie", movieSchema);
module.exports = movies;
