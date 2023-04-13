const Categorie = require("../models/categorie");

// create a new categorie and save
exports.createCategorie = async (req, res) => {
    try {
        const categorie = new Categorie({
        name: req.body.name,
        description: req.body.description,
        });
        const newCategorie = await categorie.save();
        res.send({
        message: "Categorie created successfully",
        success: true,
        data: newCategorie,
        });
    } catch (error) {
        res.send({
        message: error.message,
        success: false,
        data: null,
        });
    }
}

// get all categories
exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Categorie.find();
        res.send({
        message: "All categories",
        success: true,
        data: categories,
        });
    } catch (error) {
        res.send({
        message: error.message,
        success: false,
        data: null,
        });
    }
}

// get a single categorie by id
exports.getOneCategorieById = async (req, res) => {
    try {
        const categorie = await Categorie.findById(req.params.id);
        res.send({
        message: "Categorie fetched successfully",
        success: true,
        data: categorie,
        });
    } catch (error) {
        res.send({
        message: error.message,
        success: false,
        data: null,
        });
    }
}