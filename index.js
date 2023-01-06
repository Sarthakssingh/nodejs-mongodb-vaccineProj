const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes');

require('dotenv').config();
const mongoString=process.env.database;

mongoose.connect(mongoString);
const db = mongoose.connection;

db.on('connected',()=>{
    console.log("Database connected")
})


const app = express();
app.set('view engine','ejs');

app.use(express.json())

app.use('/',(router));

app.listen(5000,()=>{
    console.log(`Server is running on port 5000`)
});