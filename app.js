const express = require('express')
const app = express();
require('./handleresponse');
require('dotenv').config();
const cors = require('cors');
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cors());
const port = process.env.PORT;
app.use('/category',require('./routers/category'));
app.use('/product',require('./routers/product'));
app.use('/', (req, res) => res.send('Hello World'));
app.listen(port, (msg) => console.log(`hi connected to ${port} successfully`));

