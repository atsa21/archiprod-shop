const mongoose = require("mongoose");

const uniqueValidator = require("mongoose-unique-validator");

const typeSchema = mongoose.Schema({
    typeName: { type: String, required: true },
    materials: [{ type: String, required: true }],
    shapes: [{ type: String, required: true}],
    extras: [{ type: String, required: true }]
});

const categorySchema = mongoose.Schema({
    name: { type: String, required: true, unique: true },
    type: [typeSchema],
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
});

categorySchema.plugin(uniqueValidator);

module.exports = mongoose.model("Category", categorySchema);