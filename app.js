const express = require('express');
const http = require('http');
const path = require('path');
const { config } = require('process');
const expressLayouts = require('express-ejs-layouts');
var app = express();
var server =  http.createServer(app);


app.use(expressLayouts);
app.use("/public",express.static(path.join(__dirname,'public')));
app.engine('.ejs', require('ejs').renderFile);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.get('/',(req,res)=>res.render('pages/Home'));
app.get('/chess',(req,res)=>res.render('pages/index'));
server.listen(4000,(msg)=>console.log('listening port 4000'));

