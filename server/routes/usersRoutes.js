const express = require("express");
const router = express();
const { CreateUser, Login , getAllusers, getuser} = require("../controllers/userController");

router.post("/", Login);
router.post("/register", CreateUser);
router.get("/allusers", getAllusers);
router.get("/:id", getuser);



module.exports =  router ;

