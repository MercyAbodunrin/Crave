const Users = require("../model/Users");
const bcrypt = require("bcrypt"); //for hashing of password


const handleNewUser = async (req, res) => {
    //check if the request body is empty
    // if (!req.body) {
    //     return res.status(400).json({ "message": "All fields are required." })
    // }
    //check if the user wants to sign up with an email address
    if (req.body.email) {
      const { email, fullName, password } = req.body;
      console.log(email);
      //check if any of the fields are empty
      if (!fullName || !password) {
        console.log("All fields Required");
        return res.status(400).json({ message: "All fields are required." });
      }
      //check if the user already has an account
      const user = await Users.findOne({ email: email }).exec();
      if (user) {
        return res
          .status(409)
          .json({ message: "A user with this email address already exists." });
      }

      //create the new user if they don't exist
      try {
        //hash the password using bcrypt
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await Users.create({
          email: email,
          fullName: fullName,
          password: hashedPassword,
        });
        console.log(user);
        return res
          .status(200)
          .json({ success: `New user with email ${email} created.` });
      } catch (err) {
        console.log(`Error: ${err.message}`);
        res.status(500).json({ message: err.message });
      }
    }

    //check if the user wants to sign up with a mobile number
    else if(req.body.phoneNumber) {
        const { phoneNumber, fullName, password } = req.body;
        console.log(phoneNumber);
        //check if any of the fields are empty
        if (!fullName || !password) {
           console.log("All fields Required");
            return res.status(400).json({ "message": "All fields are required." })
        }
        //check if the user exists already
        const user = await Users.findOne({ phoneNumber: phoneNumber }).exec();
        if (user) {
            return res.status(409).json({ "message": "A user with the phone number already exists." })
        }
        //if the user doesn't exist
       try {
                //hash the password
                const hashedPassword = await bcrypt.hash(password, 10);
                const user = await Users.create({
                    phoneNumber: phoneNumber,
                    fullName: fullName,
                    password: hashedPassword
                })
           console.log(user);
           res.status(200).json({ "success": `New user with phone number ${phoneNumber} created.`})
       } catch (err) {
        console.log(err.message);
        res.status(500).json({ "message": err.message });
       }
       } else {
        return res.status(400).json({ "message": "All fields are required." })
       }
    
}

module.exports = { handleNewUser };