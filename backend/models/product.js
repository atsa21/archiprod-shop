const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    type: { type: String, required: true },
    image: { type: String, required: true },
    brand: { type: String, required: true },
    shape: { type: String, required: true },
    amount: { type: Number, required: true },
    price: { type: Number, required: true },
    currency: { type: String, required: true },
    productCode: { type: String, required: false },
    year: { type: Number, required: false },
    collection: { type: String, required: false },
    designer: { type: String, required: false },
    isOnSale: { type: Boolean, required: true },
    sale: { type: Number, required: false },
});

module.exports = mongoose.model("Product", productSchema);