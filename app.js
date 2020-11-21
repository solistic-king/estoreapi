require('dotenv').config()
const express = require('express');
const expressWinston = require('express-winston');
const winston = require('winston');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');  

const authRoutes = require('./routes/auth');
const shopRoutes = require('./routes/shop');
const categoryRoutes = require('./routes/category');
const ratingRoutes = require('./routes/rating');

const app = express();

app.use(bodyParser.json());

app.use(cors());

app.use(expressWinston.logger({
    transports: [
      new winston.transports.Console()
    ],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.json()
    )
  }));

app.use('/auth', authRoutes);
app.use('', shopRoutes);
app.use('', categoryRoutes);
app.use('', ratingRoutes);

app.use(expressWinston.errorLogger({
    transports: [
      new winston.transports.Console()
    ],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.json()
    )
  }));

app.use((error, req, res, next) => {
    console.log(error);
    const statusCode = error.statusCode || 500;
    const message = error.message;
    const data = error.data
    res.status(statusCode).json({ message: message, data: data });
});

const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI,{ useNewUrlParser: true, useUnifiedTopology: true}).then(result => {
    app.listen(process.env.PORT || 3000);
}).catch(err => {
    console.log(err);
});
