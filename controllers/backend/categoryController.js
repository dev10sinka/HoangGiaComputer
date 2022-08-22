const { request } = require("express");
const express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const Category = mongoose.model("Category");
const Product = mongoose.model("Product");
const { ObjectID } = require("bson");

router.get('/admin/category', (req, res) => {
    res.render('main/category', { layout: './layouts/containerAdmin' })
})

// Thêm
router.get("/admin/category/get-all-category", async (req, res) => {
    let data = await Category.find({})
    res.send(data)
});


router.post("/admin/category/add-category", async (req, res) => {
    let categoryName = req.body.categoryName;
    let category = new Category();
    category.categoryName = categoryName;
    category.save();
    res.send('success')
});


router.get("/admin/category/edit-category", async (req, res) => {
    let categoryName = req.query.categoryName;
    let id = req.query.id;
    await Category.updateOne({ _id: ObjectID(id) }, { $set: { categoryName: categoryName } });
    res.send('success')
});

router.get("/admin/category/remove-category", async (req, res) => {
    let id = req.query.id;
    let categoryName = await Category.find({ _id: ObjectID(id) })
    let name = categoryName[0].categoryName
    await Category.remove({ _id: ObjectID(id) })
    await Product.remove({ categoryName: name })
    res.send("success");
});


module.exports = router;
