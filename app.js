require("dotenv").config();
const express=require("express");
const path=require("path")
const mongoose=require("mongoose");
const overall = require("./models/overallStatus");
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
    
app.use(cors()); // To enable cross-origin requests
app.set("view engine","ejs");
app.set("views",path.resolve("./views"));
app.use(express.static('public'));
app.use(cookieParser())
app.use(express.urlencoded({extended:false}))
  

app.get("/", (req,res)=>{
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

app.post('/api/sos',async (req,res)=>{
    console.log("request received here!");
    try{
        const {flag}=req.body;
        if(flag=="1"){
            await overall.findByIdAndUpdate('672265055d938eaea9d99fd9', { buzz: 1 });
        }
        else{
            await overall.findByIdAndUpdate('672265055d938eaea9d99fd9', { buzz: 0 });
            res.status(400).json(req.body);
        }
    }
    catch{
        res.status(400).json({ message: 'fuckoff' });
    }
})
  
app.listen(process.env.PORT || 8000,()=>{
    console.log("Server is listening");
})


//https://1c43-49-156-109-221.ngrok-free.app/

