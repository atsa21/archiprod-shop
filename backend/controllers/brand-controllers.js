const Brand = require("../models/brand");

exports.createBrand = (req, res, next) => {
    const url = req.protocol + "://" + req.get("host");
    const brand = new Brand({
        name: req.body.name,
        year: req.body.year,
        country: req.body.country,
        website: req.body.website,
        logo: url + "/images/" + req.file.filename,
        creator: req.userData.userId
    });
    brand.save().then( createdBrand => {
        res.status(201).json({
            message:"Brand added succesfully",
            product: {
                ...createdBrand,
                id: createdBrand._id,
            }
        });
    })
    .catch(error => {
        res.status(500).json({
            message: error
        })
    });
}

exports.getBrands = (req, res, next) => {
    const pageSize = +req.query.size;
    const currentPage = +req.query.page;
    const postQuery = Brand.find().sort({ name: 1 });
    let fetchedBrand;
    if(pageSize && currentPage) {
        postQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
    }
    postQuery.then(documents => {
        fetchedBrand = documents;
        return Brand.count();
    })
    .then(count => {
        res.status(200).json({
            message: "Brands fetched succesfully!",
            data: fetchedBrand,
            totalElements: count
        });
    })
    .catch(error => {
        res.status(500).json({
            message: "Fetching products failed"
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
        year: req.body.year,
        country: req.body.country,
        website: req.body.website,
        logo: logo,
        creator: req.userData.userId
    });
    Brand.updateOne({ _id: req.params.id }, brand).then( result => {
        if (result.matchedCount) {
            res.status(200).json({
                message:"Brand updated succesfully"
            });
        } else {
            res.status(401).json({
                message: "Not authorized"
            }) 
        }
    });
}

exports.deleteBrandById = (req, res, next) => {
    Brand.deleteOne({_id: req.params.id, creator: req.userData.userId}).then(result => {
        if (result.deletedCount) {
            res.status(200).json({ message: "Brand deleted!"})
        } else {
            res.status(401).json({
                message: "Not authorized"
            })
        }
        
    });
}