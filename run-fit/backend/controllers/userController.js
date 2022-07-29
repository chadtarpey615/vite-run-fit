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
            token: generateToken(user._id)
        })
    } catch (error)
    {
        console.log(error.message);
        res.status(500).send('Server Error');
    }
}


exports.getAllUsers = async (req, res) => {
    console.log("User controller hit")
    try
    {
        const users = await User.find();

        res.status(200).json(users);
    } catch (error)
    {
        console.log(error.message);
        res.status(500).send('Server Error');
    }
}