const Mongoose = require('mongoose');
const Event = require('../models/event');
const User = require('../models/user');
const Comment = require('../models/Comments');



exports.getAllEvents = async (req, res) => {
    let events
    await Event.find({}).populate("comments").exec(function (err, user) {
        console.log("user user ", user)
        events = user
        res.json(events)
    })


}


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


    const sess = await Mongoose.startSession()
    sess.startTransaction()
    await event.save({ session: sess })
    findUser.events.push(event)
    await findUser.save({ session: sess })
    await sess.commitTransaction()
}


exports.deleteEvent = async (req, res) => {
    const eventId = req.params.id
    let event
    try
    {
        event = await Event.findById(eventId).populate('user')
        console.log("delete dddddd", event)
        event.delete()
    } catch (error)
    {
        console.log(error.message)
    }


    if (!event)
    {
        console.log("Event not found")
    }

    try
    {
        const sess = await Mongoose.startSession()
        sess.startTransaction()
        await event.remove({ session: sess })
        event.user.events.pull(event)
        await event.user.save({ session: sess })
        await sess.commitTransaction()
    } catch (error)
    {
        console.log(error.message)
    }

    res.status(200).json({ msg: 'Event deleted' })

}

exports.updateEvent = async (req, res) => {
    const eventId = req.params.id
    const { title, distance, date } = req.body
    console.log("update hit")
    let event

    try
    {
        event = await Event.findById(eventId)
    } catch (error)
    {
        console.log(error.message)
    }


    event.title = title
    event.distance = distance
    event.date = date

    try
    {
        await event.save()
    } catch (error)
    {
        console.log(error.message)
    }

}


exports.addComment = async (req, res) => {
    const eventId = req.params._id

    let event
    let comment
    let user

    try
    {
        event = await Event.findById(eventId).populate("user")
        user = await User.findById(event.user._id)
    } catch (error)
    {
        console.log(error.message)
    }

    comment = new Comment({
        user: user._id,
        event: eventId,
        name: req.body.name,
        comment: req.body.comment

    })

    comment.save()

    const sess = await Mongoose.startSession()
    sess.startTransaction()
    await event.save({ session: sess })
    event.comments.push(comment)
    await event.save({ session: sess })
    await sess.commitTransaction()
}






