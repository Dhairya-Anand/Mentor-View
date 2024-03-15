const mongoose = require("mongoose");

module.exports = () => {
	const uri = process.env.URI;

    try{
        mongoose.connect(uri);
        console.log("MongoDB connected");
    }
    catch(error){
        console.log("Error in mongodb connection", error.message);
    }
};