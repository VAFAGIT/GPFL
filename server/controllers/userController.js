const User = require("../models/user");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


//Create User
const CreateUser = async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.send({
        message: "User already exists",
        success: false,
        data: null,
      });
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 6);
    req.body.password = hashedPassword;
    const newUser = new User(req.body);
    await newUser.save();
    res.send({
      message: "User created successfully",
      success: true,
      data: existingUser,
    });
  } catch (error) {
    res.send({
      message: error.message,
      success: false,
      data: null,
    });
  }
};



// Login User
const Login =  async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (!existingUser) {
      return res.send({
        message: "User does not exist",
        success: false,
        data: null,
      });
    }
    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      existingUser.password
    );
    if (!isPasswordCorrect) {
      return res.send({
        message: "Incorrect password",
        success: false,
        data: null,
      });
    }

    const token = jwt.sign(
      { userId: existingUser._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    res.send({
      message: "User logged in successfully",
      success: true,
      data: token,
      user: existingUser,
    });
  } catch (error) {
    res.send({
      message: error.message,
      success: false,
      data: null,
    });
  }
};

//getAllusers
const getAllusers = async (req, res) => {
    try {
        const users = await User.find();
        res.send({
        message: "All users",
        success: true,
        data: users,
        });
    } catch (error) {
        res.send({
        message: error.message,
        success: false,
        data: null,
        });
    }
}

//getuser
const getuser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.send({
        message: "user",
        success: true,
        data: user,
        });
    } catch (error) {
        res.send({
        message: error.message,
        success: false,
        data: null,
        });
    }

}


module.exports = { CreateUser, Login , getAllusers, getuser};







