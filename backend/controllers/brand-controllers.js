const Brand = require("../models/brand");

exports.createBrand = (req, res, next) => {
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
}

exports.getBrands = (req, res, next) => {
    Brand.find().then(documents => {
        res.status(200).json({
            message: "Brands getted succesfully!",
            data: documents
        })
    });
}

exports.getBrandById = (req, res, next) => {
    Brand.findOne().then(brand => {
        if (brand) {
            res.status(200).json(brand);
        } else {
            res.status(404).json({
                message: "Brand not found"
            });
        }
    })
    .catch(error => {
        res.status(500).json({
            message: "Get brand by id failed"
        })
    });
}

exports.updateBrand = (req, res, next) => {
    let logo = req.body.logo;
    if(req.file) {
        const url = req.protocol + "://" + req.get("host");
        logo = url + "/images/logo/" + req.file.filename;
    }
    const brand = new Brand({
        _id: req.body.id,
        name: req.body.name,
        country: req.body.country,
        website: req.body.website,
        logo: logo
    });
    Brand.updateOne({ _id: req.params.id }, brand).then( result => {
        res.status(200).json({
            message:"Brand updated succesfully"
        });
    });
}

exports.deleteBrandById = (req, res, next) => {
    Brand.deleteOne({_id: req.params.id}).then(result => {
        res.status(200).json({ message: "Brand deleted!"})
    });
}