const express = require("express");

const Category = require("../models/category");

const router = express.Router();

router.post("", (req, res, next) => {
    const category = new Category({
        name: req.body.name,
        type: req.body.type
    });
    category.save().then( crearedCategory => {
        res.status(201).json({
            message:"Category added succesfully",
            categoryId: crearedCategory._id
        });
    });
})

router.put("/:id", (req, res, next) => {
    const category = new Category({
        name: req.body.name,
        type: req.body.type
    });
    category.updateOne({ _id: req.params.id }, category).then( result => {
        res.status(200).json({
            message:"Update succesfully"
        });
    });
})

router.get("",(req, res, next) => {
    Category.find().then(documents => {
        res.status(200).json({
            message: "Post fetched succesfully!",
            data: documents
        })
    });
});

router.delete("/:id",(req, res, next) => {
    Category.deleteOne({_id: req.params.id}).then(result => {
        console.log(result);
        res.status(200).json({ message: "Category deleted!"})
    });
});

module.exports = router;