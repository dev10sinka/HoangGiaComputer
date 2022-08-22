const { request } = require("express");
const express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");


router.get('/user/setting', (req, res) => {
  res.render('main/userSetting')
})

router.get("/user/get-user", async (req, res) => {
  let data = await User.find({})
  res.send(data)
});

router.get("/user/create-user", async (req, res) => {
    let data = await User.find({})
    if (data.length !== 0) {
        console.log('đã tồn tại User')
    }else{
        let user = new User();
        user.email = 'admin'
        user.timeCreate = '2022/06/18 13:28:35'
        user.password = '$2b$08$wOsX3.caipOB66CGB7O0kuKQHIoqNHln3cFR5oCsJxSgLPzq5Vok.'
        user.role = 'admin'
        user.username = 'admin'
        user.save()
    }
    res.send('success')
});

module.exports = router;
