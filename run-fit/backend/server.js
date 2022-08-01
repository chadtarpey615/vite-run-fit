const express = require("express")
const connectDB = require("./config/db")
const dotenv = require("dotenv").config()
const app = express()
const path = require("path");
const cors = require('cors');
// const { connect } = require("http2");

const PORT = process.env.PORT || "3003"

// connect to database
connectDB();

app.use(cors())

// for cors
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
} // end of middleware
)
app.use(express.json())
app.use(express.json({ extended: false }))





// routes go here 
app.use("/api/users", require("./routes/api/users"))
app.use("/api/events", require("./routes/api/events"))





// spin up the server

app.listen(PORT, () => console.log(`Server is running on port ${PORT}!`))