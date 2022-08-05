const mongoose = require('mongoose');

const friendsSchema = new mongoose.Schema({
    requester: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },

    username: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
    }
}, { timestamps: true });

module.exports = Friends = mongoose.model('Friend', friendsSchema);