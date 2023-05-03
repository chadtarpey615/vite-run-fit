const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// const config = require('config');
const User = require('../models/user');
const Mongoose = require('mongoose');


exports.createUser = async (req, res) => {
    console.log("User controller hit")
    const { username, email, password } = req.body;

    try
    {
        const userExist = await User.findOne({ email });

        if (userExist)
        {
            return res.status(400).json({ msg: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            username,
            email,
            password: hashedPassword
        })

        if (user)
        {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id)
            })
        }
    } catch (error)
    {
        console.log(error.message);
        res.status(500).send('Server Error');
    }
}

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWTSECRET, { expiresIn: '30d' });
}


exports.userLogin = async (req, res) => {
    console.log("User controller hit")
    const { email, password } = req.body;

    try
    {
        const user = await User.findOne({ email });

        if (!user)
        {
            return res.status(400).json({ msg: 'User does not exist' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch)
        {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        res.status(200).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            friends: [user.friends],
            token: generateToken(user._id)
        })
    } catch (error)
    {
        console.log(error.message);
        res.status(500).send('Server Error');
    }
}


exports.getAllUsers = async (req, res) => {
    console.log("User controller hit get all users")
    try
    {
        const users = await User.find({});
        console.log(users)
        res.status(200).json(users);
    } catch (error)
    {
        console.log(error.message);
        res.status(500).send('Server Error');
    }
}


exports.addFriend = async (req, res) => {
    const { id, friend } = req.params

    try
    {
        const friendId = await User.findById(friend)

        if (!friendId)
        {
            return res.status(400).json({ msg: 'Friend does not exist' });
        }

        const user = await User.findById(id)

        if (user.friends.includes(friendId._id))
        {
            return res.status(400).json({ msg: 'Friend already added' });

        }

        const updatedUser = await User.findByIdAndUpdate(id, { $push: { friends: { id: friendId._id, username: friendId.username } } }, { new: true })
        res.status(200).json(updatedUser)
    } catch (error)
    {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });

    }
};


exports.getFriendsForUser = async (req, res, next) => {
    console.log("usercont")
    const userId = req.params.id

    let user
    let userFriends = []


    user = await User.findById(userId).populate("friends")
    const { friends } = user
    for (let i = 0; i < friends.length; i++)
    {
        // res.json(friends[i].username)
        userFriends.push(friends[i].username)
        // friends[i] = await Friends.findById
        // res.json(userFriends)
    }
    res.json(userFriends)
    next()

}
