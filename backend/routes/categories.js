const express = require("express");

const Category = require("../models/category");
const checkAuth = require("../middleware/check-auth");

const router = express.Router();

router.post("", checkAuth, (req, res, next) => {
    const category = new Category({
        name: req.body.name,
        type: [req.body.type],
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
    const category = new Category({
        name: req.body.name,
        type: req.body.type,
        creator: req.userData.userId
    });
    category.updateOne({ _id: req.params.id }, category).then( result => {
        res.status(200).json({
            message:"Update succesfully"
        });
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