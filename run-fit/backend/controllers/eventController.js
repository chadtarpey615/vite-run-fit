const Mongoose = require('mongoose');
const Event = require('../models/event');
const User = require('../models/user');


exports.createEvent = async (req, res) => {
    console.log("Event controller hit")
    const { user, title, date, distance, creator } = req.body;


    const eventExist = await Event.findOne({ title });

    if (eventExist)
    {
        return res.status(400).json({ msg: 'Event already exists' });
    }

    let event

    event = new Event({
        user,
        title,
        date,
        distance,
        creator
    })

    let findUser

    try
    {
        findUser = await User.findById(user)
    } catch (error)
    {
        console.log(error.message)
    }




    const session = await Mongoose.startSession()
    session.startTransaction()
    await event.save({ session: sess })
    findUser.events.push(event)
    await findUser.save({ session: sess })
    await session.commitTransaction()
}

exports.getAllEvents = async (req, res) => {
    // let events
    await Event.find({}, (err, events) => {
        if (err)
        {
            console.log(err)
        } else
        {
            res.json(events)
        }
    })
}
