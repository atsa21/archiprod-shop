const mongoose = require("mongoose");

const brandSchema = mongoose.Schema({
    name: { type: String, required: true },
    logo: { type: String, required: true },
    location: { type: String, required: true },
    website: { type: String, required: true }
});

module.exports = mongoose.model("Brand", brandSchema);