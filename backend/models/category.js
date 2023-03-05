const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
    name: { type: String, required: true},
    type: { type: String, required: true}
});

module.export = mongoose.model("Category", categorySchema);