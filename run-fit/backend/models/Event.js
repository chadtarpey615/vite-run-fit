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
    },

    comments: [
        {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: "Comments"
        }
    ]

    // if just want comments to be an array on event model

    // comments: [
    //     {
    //         name: {
    //             type: String,
    //             required: true
    //         },
    //         comment: {
    //             type: String,
    //             required: true
    //         }
    //     }
    // ]
}
    , { timestamps: true });

module.exports = Event = mongoose.model('Event', eventSchema);