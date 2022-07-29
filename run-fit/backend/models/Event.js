const mongoose = require('mongoose');



const eventSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    title: {
        type: String,
        required: true

    },

    date: {
        type: Date,
        required: true
    },

    distance: {
        type: Number,
        required: true
    },

    creator: {
        type: String,
        required: true
    }
}
    , { timestamps: true });

module.exports = Event = mongoose.model('Event', eventSchema);