const Category = require("../models/category");

exports.createCategory = (req, res, next) => {

    const categoryType = {
        typeName: req.body.typeName,
        materials: req.body.materials,
        shapes: req.body.shapes,
        extras: req.body.extras
    };

    const category = new Category({
        name: req.body.name,
        type: [categoryType],
        creator: req.userData.userId
    });
    category.save().then( crearedCategory => {
        res.status(201).json({
            message:"Category added succesfully",
            categoryId: crearedCategory._id
        });
    });
}

exports.addCategoryTypeById = (req, res, next) => {
    const categoryType = {
        typeName: req.body.typeName,
        materials: req.body.materials,
        shapes: req.body.shapes,
        extras: req.body.extras
    };

    Category.findOneAndUpdate({ _id: req.params.id }, { $push: { type: categoryType } }).then( result => {
        res.status(200).json({
            message:"Category update succesfully",
            result: result
        });
    }).catch(error => {
        res.status(500).json({ message: "Couldn't update category" });
    });
}

exports.getCategories = (req, res, next) => {
    Category.find().then(documents => {
        res.status(200).json({
            message: "Category fetched succesfully!",
            data: documents
        })
    });
}

exports.getCategoryById = (req, res, next) => {
    const categoryId = req.params.id;
    
    Category.findById(categoryId).then(documents => {
        res.status(200).json({
            message: "Category getted by id succesfully!",
            data: documents
        })
    });
}
