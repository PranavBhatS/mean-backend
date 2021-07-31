import { join } from "path";
import express, { static as _static } from "express";
import { json, urlencoded } from "body-parser";


import postsRoutes from "./routes/posts";
import userRoutes from './routes/user';

const app = express();
import { connect } from 'mongoose';
const uri = "mongodb+srv://pranavsarang:pranav@123@cluster0.xezjk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
connect(uri,
    { useNewUrlParser: true ,useUnifiedTopology:true})
    .then(() => {
        console.log('database connected')
    })
    .catch((err) => {
        console.log('database error',err)
    })

app.use(json());
app.use(urlencoded({ extended: false }))
app.use("/images", _static(join("backend/images")))
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    // Authorization
    res.setHeader("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type,Accept");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE,OPTIONS,PUT");
    next();
})

app.use('/api/posts', postsRoutes)
app.use('/api/user', userRoutes)

export default app;

