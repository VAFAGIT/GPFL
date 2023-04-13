const Admin = require("../models/admin");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


//Create admin
const CreateAdmin = async (req, res) => {
  try {
    const existingUser = await Admin.findOne({ email: req.body.email });
    if (existingUser) {
      return res.send({
        message: "admin already exists",
        success: false,
        data: null,
      });
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 6);
    req.body.password = hashedPassword;
    const newUser = new Admin(req.body);
    await newUser.save();
    res.send({
      message: "Admin created successfully",
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



// Login admin
const Login =  async (req, res) => {
  try {
    const existingUser = await Admin.findOne({ email: req.body.email });
    if (!existingUser) {
      return res.send({
        message: "Admin does not exist",
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
      { adminId: existingUser._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    res.send({
      message: "Admin logged in successfully",
      success: true,
      data: token,
      admin: existingUser,
    });
  } catch (error) {
    res.send({
      message: error.message,
      success: false,
      data: null,
    });
  }
};




module.exports = { CreateAdmin, Login };







