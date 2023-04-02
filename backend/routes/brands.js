const express = require("express");
const multer = require("multer");

const Brand = require("../models/brand");
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
    const brand = new Brand({
        name: req.body.name,
        country: req.body.country,
        website: req.body.website,
        logo: url + "/images/logo/" + req.file.filename,
    });
    brand.save().then( createdBrand => {
        res.status(201).json({
            message:"Brand added succesfully",
            product: {
                ...createdBrand,
                id: createdBrand._id,
            }
        });
    });
});

router.put("/:id", checkAuth, multer({ storage: storage }).single("image"), (req, res, next) => {
    let logo = req.body.logo;
    if(req.file) {
        const url = req.protocol + "://" + req.get("host");
        logo = url + "/images/logo/" + req.file.filename;
    }
    const brand = new Brand({
        _id: req.body.id,
        country: req.body.country,
        website: req.body.website,
        logo: logo
    });
    Brand.updateOne({ _id: req.params.id }, brand).then( result => {
        res.status(200).json({
            message:"Brand updated succesfully"
        });
    });
});

router.get("",(req, res, next) => {
    Brand.find().then(documents => {
        res.status(200).json({
            message: "Brands getted succesfully!",
            data: documents
        })
    });
});

router.delete("/:id", checkAuth, (req, res, next) => {
    Brand.deleteOne({_id: req.params.id}).then(result => {
        res.status(200).json({ message: "Brand deleted!"})
    });
});

module.exports = router;
