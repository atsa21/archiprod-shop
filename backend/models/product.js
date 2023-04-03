const mongoose = require("mongoose");

const priceSchema = mongoose.Schema({
    amount: { type: Number, default: 0 },
    currency: { type: String, required: true },
});

const additionalSchema = mongoose.Schema({
    material: [{ type: String, required: true }],
    shape: { type: String, required: true },
    extras: [{ type: String, required: true }],
    year: { type: Number, required: false },
    collectionName: { type: String, required: true },
    designer: { type: String, required: false },
    isOnSale: { type: Boolean, default: false },
    sale: { type: Number, required: false },
});

const productsSchema = mongoose.Schema({
    category: { type: String, required: true },
    type: { type: String, required: true },
    imagePath: { type: String, required: true },
    brand: { type: String, required: true },
    productCode: { type: String, required: false },
    price: priceSchema,
    additionalInfo: additionalSchema,
    total: { type: Number, default: 0 },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
});

module.exports = mongoose.model("Product", productsSchema);