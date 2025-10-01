var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');


var productsRouter = require('./routes/products.js');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'http://localhost:5173', 
      'http://localhost:5174',
      'http://localhost:4173',
      'http://localhost:8080',
      /\.onrender\.com$/
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
);


app.use('/api', productsRouter);

module.exports = app;