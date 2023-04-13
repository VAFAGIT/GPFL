const express = require("express");
const router = express();
const { CreateAdmin, Login } = require("../controllers/adminController");

router.post("/", Login);
router.post("/register", CreateAdmin);


module.exports =  router ;

