const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb://localhost:27017/wns', { useNewUrlParser: true });
var connection = mongoose.connection;
mongoose.Promise = global.Promise;

app.use(bodyParser.json());

// setting CORS should be defined before routes !important//
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});

app.use('/api', require('./routes/api'));
app.use('/user', require('./routes/users'));

app.use(function(err, req, res, next){
    console.log(err);
    res.send({ error: err.message});
});

app.listen(process.env.port || 3200, function(){
    console.log('Server Started at port: 3200');
});