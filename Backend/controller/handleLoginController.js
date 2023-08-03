const Users = require("../model/Users");
const bcrypt = require("bcrypt"); //for hashing of password
const jwt = require("jsonwebtoken");

// Use the JWT secret key
const secretKey = process.env.JWT_SECRET;
// Use the JWT expiry time

const handleLogin = async (req, res) => {
  //check if the user entered an email
  if (req.body.email) {
    const { email, password } = req.body;

    try {
      const user = await Users.findOne({ email });
      //check if the user exists
      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      // Compare the provided password with the hashed password in the database
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return res.status(401).json({ message: "Invalid password" });
      }

      // Generate a JWT token for the user

      const token = jwt.sign(
        { email: user.email || user.phoneNumber },
        secretKey,
        { expiresIn: "1d" }
      );

      return res.json({ message: "Login successful", token });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }
  //check if the user entered a phone number
  else if (req.body.phoneNumber) {
    const { phoneNumber, password } = req.body;

    try {
      const user = await Users.findOne({ phoneNumber });
      //check if the user exists
      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      // Compare the provided password with the hashed password in the database
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return res.status(401).json({ message: "Invalid password" });
      }

      // Generate a JWT token for the user

      const token = jwt.sign({ phoneNumber: user.phoneNumber }, secretKey, {
        expiresIn: "1d",
      });

      return res.json({ message: "Login successful", token });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  } else {
    return res.status(400).json({ message: "All fields are required." });
  }
};

module.exports = { handleLogin };
