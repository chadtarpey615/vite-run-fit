const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true

    },

    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: true

    },

    name: {
        type: String,
        required: true

    },

    comment: {
        type: String,
        required: true
    }
})

module.exports = Comments = mongoose.model('Comments', commentSchema);

