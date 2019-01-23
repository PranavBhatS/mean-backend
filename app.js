const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");


const postsRoutes = require("./routes/posts");
const userRoutes = require('./routes/user');

const app = express();
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/node-angular',
    { useNewUrlParser: true })
    .then(() => {
        console.log('database connected')
    })
    .catch(() => {
        console.log('database error')
    })

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
console.log("pranav");
app.use("/images", express.static(path.join("backend/images")))
console.log("pranav");
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type,Accept,Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE,OPTIONS,PUT");
    next();
})

app.use('/api/posts', postsRoutes)
app.use('/api/user', userRoutes)

module.exports = app;

