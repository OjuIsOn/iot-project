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
const contactRouter = require('./routes/contact');
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
app.use(express.json());
  

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

  let globalBuzzValue = 0; // Global variable to store buzz value

  app.post('/api/sos', async (req, res) => {
      console.log("POST request received:", req.body);
      try {
          const { flag } = req.body;
          globalBuzzValue = flag === "1" ? 1 : 0; // Update global variable
  
          await overall.findByIdAndUpdate('672265055d938eaea9d99fd9', { buzz: globalBuzzValue });
  
          res.status(200).json({ message: 'POST processed successfully', buzz: globalBuzzValue });
      } catch (error) {
          console.error("Error in POST request:", error.message);
          res.status(500).json({ message: 'Server error', error: error.message });
      }
  });
  
  app.get('/api/sos', (req, res) => {
      try {
          if (globalBuzzValue !== null) {
              res.json({ buzz: globalBuzzValue }); // Return the value from global variable
          } else {
              res.status(404).json({ message: 'Buzz value not set' });
          }
      } catch (error) {
          console.error("Error in GET request:", error.message);
          res.status(500).json({ message: 'Error retrieving data' });
      }
  });
  

app.use("/api/contact",restrictToLoggedinUser, contactRouter); // Use the new route
  
app.listen(process.env.PORT || 8000,()=>{
    console.log("Server is listening");
})

//https://1c43-49-156-109-221.ngrok-free.app/