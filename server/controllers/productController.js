const productsModel = require("../models/product");

// create and save a new product
const createProduct = async (req, res) => {
  try {
    const product = new productsModel({
      productName: req.body.productName,
      price: req.body.price,
      description: req.body.description,
      image: req.body.image,
      categorie: req.body.categorie,
      quantity: req.body.quantity,
    });
    const newProduct = await product.save();
    res.send({
      message: "Product created successfully",
      success: true,
      data: newProduct,
    });
  } catch (error) {
    res.send({
      message: error.message,
      success: false,
      data: null,
    });
  }
}

// get a single product by id
const getOneProductById = async (req, res) => {
  try {
    const product = await productsModel.findById(req.params.id);
    res.send({
      message: "Product fetched successfully",
      success: true,
      data: product,
    });
  } catch (error) {
    res.send({
      message: error.message,
      success: false,
      data: null,
    });
  }
}

// get all products
const getAllProducts = async (req, res) => {
  try {
    const products = await productsModel.find().populate('categorie');
    res.send({
      message: "All products",
      success: true,
      data: products,
    });
  } catch (error) {
    res.send({
      message: error.message,
      success: false,
      data: null,
    });
  }
}

// update a product by id and save
const updateOneProduct = async (req, res) => {
  try {
    const product = await productsModel.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      image: req.body.image,
      category: req.body.category,
      quantity: req.body.quantity,
    });
    res.send({
      message: "Product updated successfully",
      success: true,
      data: product,
    });
  } catch (error) {
    res.send({
      message: error.message,
      success: false,
      data: null,
    });
  }
}

// delete a product by id
const deleteProduct = async (req, res) => {
  try {
    const product = await productsModel.findByIdAndDelete(req.params.id);
    res.send({
      message: "Product deleted successfully",
      success: true,
      data: product,
    });
  } catch (error) {
    res.send({
      message: error.message,
      success: false,
      data: null,
    });
  }
  
}
module.exports = {
  createProduct,
  getOneProductById,
  getAllProducts,
  updateOneProduct,
  deleteProduct
};
