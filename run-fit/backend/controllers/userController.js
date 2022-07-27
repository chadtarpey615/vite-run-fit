const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
// const User = require('../models/user');
const Mongoose = require('mongoose');

exports.createUser = async (req, res) => {
    console.log("User routes hit")
    const { name, email, password } = req.body;

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