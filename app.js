const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");


const postsRoutes = require("./routes/posts");
const userRoutes = require('./routes/user');

const app = express();
const mongoose = require('mongoose');
const uri = "mongodb+srv://pranavsarang:pranav@123@cluster0.xezjk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(uri,
    { useNewUrlParser: true ,useUnifiedTopology:true})
    .then(() => {
        console.log('database connected')
    })
    .catch((err) => {
        console.log('database error',err)
    })

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use("/images", express.static(path.join("backend/images")))
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    // Authorization
    res.setHeader("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type,Accept");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE,OPTIONS,PUT");
    next();
})

app.use('/api/posts', postsRoutes)
app.use('/api/user', userRoutes)

module.exports = app;

