const Order = require("../models/order");
const product = require("../../server/models/product")
const user = require(".././models/user");

exports.createOrder = async (req, res) => {
    try {
        const order = new Order({
            user: req.body.user,
            products: req.body.products,
            quantité: req.body.quantité,
            adresse: req.body.adresse,
            num_carte_bancaire: req.body.num_carte_bancaire,
        });
        const newOrder = await order.save();
        res.send({
        message: "Order created successfully",
        success: true,
        data: newOrder,
        });
    } catch (error) {
        res.send({
        message: error.message,
        success: false,
        data: null,
        });
    }
}

// get all orders
exports.getAllOrders = async (req, res) => {
    try {
        const orders = await db.Order.find();
        res.send({
        message: "All orders",
        success: true,
        data: orders,
        });
    } catch (error) {
        res.send({
        message: error.message,
        success: false,
        data: null,
        });
    }
}

// get a single order by id
exports.getOneOrderById = async (req, res) => {
    try {
        const order = await db.Order.findById(req.params.id);
        res.send({
        message: "Order fetched successfully",
        success: true,
        data: order,
        });
    } catch (error) {
        res.send({
        message: error.message,
        success: false,
        data: null,
        });
    }
}

// update an order by id
exports.updateOrderById = async (req, res) => {
    try {
        const order = await db.Order.findById(req.params.id);
        order.user = req.body.user;
        order.products = req.body.products;
        const updatedOrder = await order.save();
        res.send({
        message: "Order updated successfully",
        success: true,
        data: updatedOrder,
        });
    } catch (error) {
        res.send({
        message: error.message,
        success: false,
        data: null,
        });
    }
}

// delete an order by id
exports.deleteOrderById = async (req, res) => {
    try {
        const order = await db.Order.findById(req.params.id);
        const deletedOrder = await order.remove();
        res.send({
        message: "Order deleted successfully",
        success: true,
        data: deletedOrder,
        });
    } catch (error) {
        res.send({
        message: error.message,
        success: false,
        data: null,
        });
    }
}





