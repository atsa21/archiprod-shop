const express = require("express");
const multer = require("multer");

const Product = require("../models/product");
const checkAuth = require("../middleware/check-auth");

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

router.post("", checkAuth, multer({ storage: storage }).single("image"), (req, res, next) => {
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
        isOnSale: req.body.inOnSale
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

router.put("/:id", checkAuth, multer({ storage: storage }).single("image"), (req, res, next) => {
    let imagePath = req.body.imagePath;
    if(req.file) {
        const url = req.protocol + "://" + req.get("host");
        imagePath = url + "/images/" + req.file.filename;
    }
    const product = new Product({
        _id: req.body.id,
        category: req.body.category,
        type: req.body.type,
        material: req.body.material,
        brand: req.body.brand,
        imagePath: imagePath,
        collectionName: req.body.collectionName,
        amount: req.body.amount,
        price: req.body.price,
        currency: req.body.currency,
        isOnSale: req.body.inOnSale
    });
    Product.updateOne({ _id: req.params.id }, product).then( result => {
        res.status(200).json({
            message:"Update succesfully"
        });
    });
});

router.get("",(req, res, next) => {
    const pageSize = +req.query.size;
    const currentPage = +req.query.page;
    const postQuery = Product.find();
    let fetchedProduct;
    if(pageSize && currentPage) {
        postQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
    }
    postQuery.then(documents => {
        fetchedProduct = documents;
        return Product.count();
    })
    .then(count => {
        res.status(200).json({
            message: "Product fetched succesfully!",
            data: fetchedProduct,
            totalElements: count
        });
    });
});

router.get("/:id",(req, res, next) => {
    Product.find().then(documents => {
        res.status(200).json({
            message: "Product fetched succesfully!",
            data: documents
        })
    });
});

router.delete("/:id", checkAuth, (req, res, next) => {
    Product.deleteOne({_id: req.params.id}).then(result => {
        res.status(200).json({ message: "Product deleted!"})
    });
});

module.exports = router;