const express = require("express");
const router = express();
const { createCategorie, getAllCategories, getOneCategorieById } = require("../controllers/categorieController");

router.post("/", createCategorie);
router.get("/allcategories", getAllCategories);
router.get("/:id", getOneCategorieById);


module.exports =  router ;

