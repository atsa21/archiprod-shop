const express = require("express");

const Category = require("../models/category");
const checkAuth = require("../middleware/check-auth");

const router = express.Router();

router.post("", checkAuth, (req, res, next) => {
    const { name, type } = req.body;

    const categoryType = {
        typeName: type.typeName,
        materials: type.materials,
        shapes: type.shapes,
        extras: type.extras
    };

    const category = new Category({
        name: name,
        type: [categoryType],
        creator: req.userData.userId
    });
    category.save().then( crearedCategory => {
        res.status(201).json({
            message:"Category added succesfully",
            categoryId: crearedCategory._id
        });
    });
});

router.put("/:id", checkAuth, (req, res, next) => {
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
});

router.get("",(req, res, next) => {
    Category.find().then(documents => {
        res.status(200).json({
            message: "Category fetched succesfully!",
            data: documents
        })
    });
});

router.get("/:id",(req, res, next) => {
    Category.find().then(documents => {
        res.status(200).json({
            message: "Category getted by id succesfully!",
            data: documents
        })
    });
});

router.delete("/:id", checkAuth, (req, res, next) => {
    Category.deleteOne({_id: req.params.id, creator: req.userData.userId}).then(result => {
        res.status(200).json({ message: "Category deleted!" })
    });
});

module.exports = router;