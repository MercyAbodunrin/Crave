//connect your database to your application

const mongoose = require("mongoose");

const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
    } catch(err) {
        console.log(err.message);
    }
}

module.exports = dbConnect;