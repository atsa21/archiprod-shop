const mongoose = require("mongoose");

const uniqueValidator = require("mongoose-unique-validator");

const brandSchema = mongoose.Schema({
    name: { type: String, required: true, unique: true },
    country: { type: String, required: true },
    website: { type: String, required: true },
    logo: { type: String, required: true },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
});

brandSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Brand", brandSchema);