const mongoose = require("mongoose");

const uniqueValidator = require("mongoose-unique-validator");

const typeSchema = mongoose.Schema({
    typeName: { type: String },
    materials: [{ type: String }],
    shapes: [{ type: String }],
    extras: [{ type: String }]
});

const categorySchema = mongoose.Schema({
    name: { type: String, required: true },
    type: [typeSchema],
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
});

module.exports = mongoose.model("Category", categorySchema);