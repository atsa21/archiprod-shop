const express = require("express");

const Product = require("../models/Product");

const router = express.Router();

router.post("", (req, res, next) => {
    const product = new product({
        name: req.body.name,
        type: req.body.type
    });
    product.save().then( crearedProduct => {
        res.status(201).json({
            message:"Product added succesfully",
            categoryId: crearedProduct._id
        });
    });
})

router.put("/:id", (req, res, next) => {
    const product = new product({
        name: req.body.name,
        type: req.body.type
    });
    Product.updateOne({ _id: req.params.id }, product).then( result => {
        res.status(200).json({
            message:"Update succesfully"
        });
    });
})

router.get("",(req, res, next) => {
    Product.find().then(documents => {
        res.status(200).json({
            message: "Product fetched succesfully!",
            data: documents
        })
    });
});

router.delete("/:id",(req, res, next) => {
    Product.deleteOne({_id: req.params.id}).then(result => {
        console.log(result);
        res.status(200).json({ message: "Product deleted!"})
    });
});

module.exports = router;