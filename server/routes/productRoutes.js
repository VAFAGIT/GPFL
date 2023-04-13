const express = require("express");
const router = express();
const {
    createProduct,
    getOneProductById,
    getAllProducts,
    updateOneProduct,
    deleteProduct
  } = require("../controllers/productController");

router.post("/", createProduct);
router.put("/update/:id", updateOneProduct);
router.get("/allproducts", getAllProducts);
router.get("/:id", getOneProductById);
router.delete("/:id", deleteProduct);


module.exports =  router ;

