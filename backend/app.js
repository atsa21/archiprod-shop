const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const Category = require('./models/category')

const app = express();

const password = '8gI5bWUPYIB8XIAH'

mongoose.connect("mongodb+srv://ts21ann:" + password + "@skillhub.qr25lpk.mongodb.net/archiprod?retryWrites=true&w=majority")
.then(() => {
    console.log('Connected database!');
})
.catch(() => {
    console.log("Connection failed!");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PATCH, DELETE, OPTIONS"
    );
    next();
});

app.post("/api/categories", (req, res, next) => {
    console.log(req.body);
    const category = new Category({
        name: req.body.name,
        type: req.body.type
    });
    category.save().then( crearedCategory => {
        res.status(201).json({
            message:"Product added succesfully",
            categoryId: crearedCategory._id
        });
    });
})

app.get('/api/categories',(req, res, next) => {
    Category.find().then(documents => {
        res.status(200).json({
            message: "Post fetched succesfully!",
            data: documents
        })
    });
});

app.delete('/api/categories/:id',(req, res, next) => {
    Category.deleteOne({_id: req.params.id}).then(result => {
        console.log(result);
        res.status(200).json({ message: "Category deleted!"})
    });
});

module.exports = app;