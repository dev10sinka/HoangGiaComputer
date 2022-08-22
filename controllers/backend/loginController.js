const { request } = require("express");
const express = require("express");
var router = express.Router();
const authService = require("../../service/authentication/authenticationService");
// const mongoose = require("mongoose");
// const Post = mongoose.model("Post");



// router login
router.get("/admin/login", (req, res) => {
    res.render("main/login",{ title: 'Log In',layout:'./layouts/containerLogin' });
})

// router check login
router.post("/post-login", async (req, res) => {
    var username = authService.Sanitizing(req.body.username);
    var password = authService.Sanitizing(req.body.password);
    var user = await authService.findUserByUserNameOrEmail(username);
    if(!user) return res.status(201).json({success:false,message:'Username is not exits'});
    const isPasswordValid = await authService.comparePassword(password, user.password);
    if (!isPasswordValid) return res.status(201).json({success:false,message:'Password is not correct'});
    data = {_id: user._id,role: user.role}
    var token = authService.generateToken(data);
    if (user.role == 'admin') {
        return res.status(201).json({
            role: 'admin',
            token: token,
            username:user.username,
            success:true,
            message:""
        })
    } else {
        return res.status(201).json({
            role: 'customer',
            success:true,
            message:""
        })
    }
});

module.exports = router;
