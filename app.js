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


mongoose.connect(process.env.MONGODB_URI,{ serverSelectionTimeoutMS: 5000})
    .then(() => {
        console.log('Database connected successfully');
    })
    .catch(err => {
        console.error('Database connection error:', err);
    });

app.set("view engine","ejs");
app.set("views",path.resolve("./views"));
app.use(express.static('public'));

app.use(cors()); // To enable cross-origin requests
app.use(cookieParser())
app.use(express.urlencoded({extended:false}))
  

app.get("/",(req,res)=>{
    res.render("home")
})

app.use("/api/user",userRoutes);

app.use("/api/cycle",cycleRoutes);

app.get('/api/menu', (req, res) => {
    res.render('menu'); // Renders the 'second-page.ejs' template
  });

app.get('/api/maps', (req, res) => {
    res.render('maps'); // Renders the 'second-page.ejs' template
  });

app.listen(process.env.PORT || 8000,()=>{
    console.log("Server is listening");
})


//https://1c43-49-156-109-221.ngrok-free.app/

