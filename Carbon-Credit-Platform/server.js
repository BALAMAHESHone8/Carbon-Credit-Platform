const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const carbonRoutes = require("./routes/carbon");
const leaderboardRoutes = require("./routes/leaderboard");
const aiRoutes = require("./routes/ai");
const industryRoutes = require("./routes/industry");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));


// MongoDB Connection

mongoose.connect(process.env.MONGO_URI)
.then(()=>{

    console.log("✅ MongoDB Connected");

})
.catch((err)=>{

    console.log("MongoDB Error:",err);

});


// Routes AFTER MongoDB

// Routes AFTER MongoDB

app.use("/api/auth", authRoutes);
app.use("/api/carbon", carbonRoutes);
app.use("/api/leaderboard", leaderboardRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/industry", industryRoutes);



const PORT = process.env.PORT || 5000;


app.listen(PORT,"0.0.0.0", ()=>{

    console.log(`🚀 Server running on ${PORT}`);

});