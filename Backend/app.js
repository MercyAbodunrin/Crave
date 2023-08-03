const express = require("express");
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 5000;
const bodyParser = require("body-parser");
const dbConnect = require("./config/dbConnect");
const mongoose = require("mongoose");
const Users = require("./model/Users");
const bcrypt = require("bcrypt");

//connect to the database
dbConnect();

//middlewares for parding json data, getting url-encoded data and serving static files
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

//set up ejs engine
app.set('views', './views');
app.set('view engine', 'ejs');

//custom middlewares(routes)
app.use("/register", require("./routes/handleNewUserRoute"));

// User login route
app.use('/login', require("./routes/handleLoginRoute"));


app.get('/users', async (req, res) => {
    const users = await Users.find();
    res.json(users);
})



mongoose.connection.once("open", () => {
    console.log("Database connection successful");
    app.listen(PORT, () => {
      console.log(`Server is listening on PORT ${PORT}`);
    });
})
