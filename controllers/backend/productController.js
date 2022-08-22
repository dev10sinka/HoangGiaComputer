const { request } = require("express");
const express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const Category = mongoose.model("Category");
const Product = mongoose.model("Product");
const multer = require("multer");
const path = require("path");

const { ObjectID } = require("bson");

let arrayImage = [];

router.get("/admin/product", (req, res) => {
  res.render("main/list-product", { layout: "./layouts/containerAdmin" });
});

router.get("/admin/product/get-all-product", async (req, res) => {
  let data = await Product.find({});
  res.send(data);
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets/images/product/");
  },

  filename: function (req, file, cb) {
    let nameImage = Date.now() + ".jpg";
    arrayImage.push(nameImage);
    cb(null, nameImage);
  },
});

var upload = multer({ storage: storage });

router.post(
  "/admin/product/add-product",
  upload.array("multi-files"),
  (req, res) => {
    let product = new Product();
    product.productName = req.body.productName;
    product.categoryName = req.body.categoryName;
    product.price = req.body.price;
    product.origin = req.body.origin;
    product.color = req.body.color;
    product.thickness = req.body.thickness;
    product.discount = req.body.discount;
    product.describe = req.body.describe;
    product.image = arrayImage;
    product.dateCreate = req.body.dateCreate;
    product.save();
    arrayImage = [];
    res.redirect("/admin/product");
  }
);

router.get("/admin/category/edit-category", async (req, res) => {
  let categoryName = req.query.categoryName;
  let id = req.query.id;
  await Category.updateOne(
    { _id: ObjectID(id) },
    { $set: { categoryName: categoryName } }
  );
  res.send("success");
});

router.get("/admin/product/remove-product", async (req, res) => {
  let id = req.query.id;
  await Product.remove({ _id: ObjectID(id) });
  res.send("success");
});

module.exports = router;
