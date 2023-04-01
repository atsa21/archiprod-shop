const mongoose = require("mongoose");

const uniqueValidator = require("mongoose-unique-validator");

const categorySchema = mongoose.Schema({
    name: { type: String, required: true , unique: true },
    type: { type: Array, required: false, items: { type: Object } }
});

categorySchema.plugin(uniqueValidator);

module.exports = mongoose.model("Category", categorySchema);