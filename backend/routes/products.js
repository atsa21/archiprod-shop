const express = require("express");
const multer = require("multer");

const Product = require("../models/product");

const router = express.Router();

const MIME_TYPE_MAP = {
    "image/png": "png",
    "image/jpeg": "jpg",
    "image/jpg": "jpg"
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const isValid = MIME_TYPE_MAP[file.mimetype];
      let error = new Error("Invalid mime type");
      if (isValid) {
        error = null;
      }
      cb(error, "backend/images");
    },
    filename: (req, file, cb) => {
      const name = file.originalname
        .toLowerCase()
        .split(" ")
        .join("-");
      const ext = MIME_TYPE_MAP[file.mimetype];
      cb(null, name + "-" + Date.now() + "." + ext);
    }
});

router.post("", multer({ storage: storage }).single("image"), (req, res, next) => {
    const url = req.protocol + "://" + req.get("host");
    const product = new Product({
        category: req.body.category,
        type: req.body.type,
        material: req.body.material,
        brand: req.body.brand,
        imagePath: url + "/images/" + req.file.filename,
        collectionName: req.body.collectionName,
        amount: req.body.amount,
        price: req.body.price,
        currency: req.body.currency,
        isOnSale: false
    });
    product.save().then( createdProd => {
        res.status(201).json({
            message:"Product added succesfully",
            product: {
                ...createdProd,
                id: createdProd._id,
            }
        });
    });
});

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
});

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