const Product = require("../models/product");

exports.createProduct = (req, res, next) => {
    const url = req.protocol + "://" + req.get("host");
    const { category, type, materials, shape, extras, brand, collectionName, amount, price, currency, inOnSale } = req.body;

    const prodPrice = {
        amount: price,
        currency: currency
    };

    const productAdditionals = {
        materials: materials,
        shape: shape,
        extras: extras,
        productCode: req.body.productCode ? req.body.productCode : null,
        year: req.body.year ? req.body.year : null,
        collectionName: collectionName,
        designer: req.body.designer ? req.body.designer : null,
        isOnSale: inOnSale,
        sale: req.body.sale ? req.body.sale : null
    };

    const product = new Product({
        category: category,
        type: type,
        brand: brand,
        imagePath: url + "/images/" + req.file.filename,
        price: prodPrice,
        additionalInfo: productAdditionals,
        total: amount,
        creator: req.userData.userId
    });
    product.save().then( createdProd => {
        res.status(201).json({
            message:"Product added succesfully",
            product: {
                ...createdProd,
                id: createdProd._id,
            }
        });
    })
    .catch(error => {
        res.status(500).json({
            message: error
        })
    });
}

exports.getProducts = (req, res, next) => {
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
    })
    .catch(error => {
        res.status(500).json({
            message: "Fetching products failed"
        })
    });
}

exports.getProductById = (req, res, next) => {
    Product.find().then(product => {
        if (product) {
            res.status(200).json(product);
        } else {
            res.status(404).json({
                message: "Product not found"
            });
        }
    })
    .catch(error => {
        res.status(500).json({
            message: "Get product by id failed"
        })
    });
}

exports.updateProduct = (req, res, next) => {
    let imagePath = req.body.imagePath;
    const { category, type, materials, shape, extras, brand, collectionName, amount, price, currency, inOnSale } = req.body;

    if(req.file) {
        const url = req.protocol + "://" + req.get("host");
        imagePath = url + "/images/" + req.file.filename;
    }
    
    const prodPrice = {
        amount: price,
        currency: currency
    };

    const productAdditionals = {
        materials: materials,
        shape: shape,
        extras: extras,
        year: req.body.year,
        collectionName: collectionName,
        designer: req.body.designer,
        isOnSale: inOnSale,
        sale: req.body.sale,
    };

    const product = new Product({
        _id: req.body.id,
        category: category,
        type: type,
        brand: brand,
        imagePath: imagePath,
        price: prodPrice,
        additionalInfo: productAdditionals,
        total: amount,
        creator: req.userData.userId
    });
    Product.updateOne({ _id: req.params.id }, product).then(result => {
        if (result.n > 0) {
            res.status(200).json({
                message:"Post succesfully updated!"
            });
        } else {
            res.status(401).json({
                message: "Not authorized"
            })
        }
    })
    .catch(error => {
        res.status(500).json({
            message: "Updating product failed"
        })
    });
}

exports.deleteProductById = (req, res, next) => {
    Product.deleteOne({_id: req.params.id, creator: req.userData.userId}).then(result => {
        if (result.n > 0) {
            res.status(200).json({ message: "Deleting product successful!"});
        } else {
            res.status(401).json({
                message: "Not authorized"
            })
        }
    })
    .catch(error => {
        res.status(500).json({
            message: "Deleting post failed"
        })
    });
}




