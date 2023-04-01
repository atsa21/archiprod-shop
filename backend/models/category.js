const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
    name: { type: String, required: true },
    type: { type: Array, required: false, items: { type: Object } }
});

module.exports = mongoose.model("Category", categorySchema);