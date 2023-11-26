const mongoose = require("mongoose");

const connectDB = async () => {
    const connect = await mongoose.connect(process.env.CONNECTION_STRING);
    console.log("Database connected: ", connect.connection.host, connect.connection.name);
    // try catch doesnt need because // Unhandled Promise Rejection in server.js
}

module.exports = connectDB; 