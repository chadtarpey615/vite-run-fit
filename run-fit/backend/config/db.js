const mongoose = require("mongoose")


const connectDB = async () => {
    console.log("Heere", process.env.MONGO_URI)

    try
    {
        const conn = await mongoose.connect(process.env.MONGO_URI || process.env.NODE_ENV)
        console.log(`MongoDb connected: ${conn.connection.host}`)
    } catch (error)
    {
        console.log(error.message)
        // exit process with failure
        process.exit(1)
    }
}

module.exports = connectDB