const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const Category = require('./models/category')

const app = express();

mongoose.connect("mongodb+srv://ts21ann:<password>@skillhub.qr25lpk.mongodb.net/?retryWrites=true&w=majority")

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers", 
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    next();
});

app.post("/api/category", (req, res, next) => {
    const category = new Category({
        name: req.body.name,
        type: req.body.type
    });
    res.status(201).json({
        message:"Product added succesfully"
    });
})

app.get('/api/category',(req, res, next) => {
    const category = [];
    res.status(200).json({
        message: "Post fetched succesfully!",
        product: product
    })
});

module.exports = app;