const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
    },

    password: {
        type: String,
        required: true,
    },

    date: {
        type: Date,
        default: Date.now,
    },

    events: [
        {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: "Event"
        }
    ],

    friends: [{
        _id: { type: mongoose.Schema.Types.ObjectId, ref: 'Friend' },
        username: { type: String, required: true }
    }],

})


module.exports = User = mongoose.model('User', userSchema);