const express = require("express")
const connectDB = require("./config/db")
const dotenv = require("dotenv").config()
const app = express()
const path = require("path");
// const { connect } = require("http2");

const PORT = process.env.PORT || "3002"

// connect to database
connectDB();


app.use(express.json())
app.use(express.json({ extended: false }))


// routes go here 




// spin up the server

app.listen(PORT, () => console.log(`Server is running on port ${PORT}!`))