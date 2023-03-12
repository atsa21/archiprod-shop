const mongoose = require("mongoose");

const productsSchema = mongoose.Schema({
    category: { type: String, required: true },
    type: { type: String, required: true },
    imagePath: { type: String, required: true },
    brand: { type: String, required: true },
    material: { type: String, required: true },
    amount: { type: Number, default: 0 },
    price: { type: Number, default: 0 },
    currency: { type: String, required: true },
    productCode: { type: String, required: false },
    year: { type: Number, required: false },
    collectionName: { type: String, required: true },
    designer: { type: String, required: false },
    isOnSale: { type: Boolean, default: false },
    sale: { type: Number, required: false },
});

module.exports = mongoose.model("Product", productsSchema);