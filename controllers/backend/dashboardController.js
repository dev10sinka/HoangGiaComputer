const { request } = require("express");
const express = require("express");
var router = express.Router();
// const mongoose = require("mongoose");
// const Post = mongoose.model("Post");

router.get('/admin', (req, res) => {
  res.render('main/dashboard',{ layout:'./layouts/containerAdmin' })
})

module.exports = router;
