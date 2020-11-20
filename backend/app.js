const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');  

const authRoutes = require('./routes/auth');
const shopRoutes = require('./routes/shop');

const app = express();

app.use(bodyParser.json());

app.use(cors());

app.use('/auth', authRoutes);
app.use('', shopRoutes);

app.use((error, req, res, next) => {
    console.log(error);
    const statusCode = error.statusCode || 500;
    const message = error.message;
    const data = error.data
    res.status(statusCode).json({ message: message, data: data });
});

const MONGODB_URI = `mongodb+srv://varun:varunmadhu6@testcluster.n5fgm.mongodb.net/test`

mongoose.connect(MONGODB_URI).then(result => {
    app.listen(process.env.PORT || 3000);
}).catch(err => {
    console.log(err);
});
//test
