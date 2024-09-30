require("dotenv").config();
const express=require("express");
const path=require("path")
const mongoose=require("mongoose");
const app=express(); 
const cookieParser=require("cookie-parser");
const { restrictToLoggedinUser } = require("./middlewares/auth");
const userRoutes=require("./routes/user");
const cycleRoutes=require("./routes/cycle");
const { nextTick } = require("process");
const cors = require('cors');
console.log('MongoDB URI:', process.env.MONGODB_URI); // This should log the correct URI


mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Database connected successfully');
    })
    .catch(err => {
        console.error('Database connection error:', err);
    });

app.set("view engine","ejs");
app.set("views",path.resolve("./views"));

app.use(cookieParser())
app.use(express.urlencoded({extended:false}))
app.use(cors({
    origin:['https://iot-project-blond.vercel.app'], // Add localhost during development
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  }));
  

app.get("/",(req,res)=>{
    res.render("home")
})

app.use("/api/user",userRoutes);

app.use("/api/cycle",cycleRoutes);

app.listen(process.env.PORT || 8000,()=>{
    console.log("Server is listening");
})


//https://1c43-49-156-109-221.ngrok-free.app/

