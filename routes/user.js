const express=require("express")
const Router=express.Router()
const User=require("../models/user")
const {getUser,setUser}=require("../services/auth")
const { restrictToLoggedinUser } = require("../middlewares/auth")
const History = require("../models/history")
const { handleRegistration, handleLogin, handleConfig, getHistory, updateUserLocationPeriodically } = require("../controller/user")

Router.get("/register",(req,res)=>{
    res.render("register");
})
Router.get("/login",(req,res)=>{
    res.render("login");

})

Router.post("/register",handleRegistration)

Router.post("/login",handleLogin)

Router.get('/configurations',handleConfig);

Router.get('/history', restrictToLoggedinUser,getHistory);

Router.post('/updatelocation',restrictToLoggedinUser, updateUserLocationPeriodically);
  

module.exports=Router