const express = require("express");
const router = express();
const { createOrder, getAllOrders,getOneOrderById, updateOrderById,deleteOrderById } = require("../controllers/orderController");

router.post("/", createOrder);
router.post("/update", updateOrderById);
router.get("/allorders", getAllOrders);
router.get("/:id", getOneOrderById);
router.delete("/:id", deleteOrderById);



module.exports =  router ;

