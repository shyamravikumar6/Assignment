const express = require('express');
const http = require('http');
const path = require('path');
require('dotenv').config()
const { config } = require('process');
const expressLayouts = require('express-ejs-layouts');
var app = express();
// var server =  http.createServer(app);
var port = process.env.PORT || 8080;

app.use(expressLayouts);
app.use("/public",express.static(path.join(__dirname,'public')));
app.engine('.ejs', require('ejs').renderFile);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// app.get('/',(req,res)=>res.render('pages/Home'));
app.get('/',(req,res)=>res.render('pages/Product'));
app.get('/category',(req,res)=>res.render('pages/Category'));
app.get('/chess',(req,res)=>res.render('pages/index'));
app.get('/contactus',(req,res)=>res.render('pages/Contact'));
app.listen(port,(msg)=>console.log(`listening port ${port}`));


