const express = require('express');
const router = express.Router();
const Tabular = require('../models/tabular');
const Piechart = require('../models/piechart');
const BarChart = require('../models/barchart');
const checkAuth = require('../auth/check-auth');
const formidable = require('formidable');

// get the dashboard table data from mongodb
router.get('/table-data', checkAuth, function(req, res, next){
    Tabular.find().then(function(data){
        res.send(data);
    });
});

// get the dashboard piechart data from mongodb
router.get('/piechart', checkAuth, function(req, res, next){
    Piechart.find().then(function(data){
        res.send(data);
    });
});

// get the dashboard barchart data from mongodb
router.get('/barchart', checkAuth, function(req, res, next){
    BarChart.find().then(function(data){
        res.send(data);
    });
});


router.post('/file-upload',checkAuth,function(req,res,next){
    var form = new formidable.IncomingForm();
    
    console.log("datat",form.parse(req));

    // form.on('fileBegin', function (name, file){
    //     file.path = __dirname + '/uploads/' + file.name;
    // });

    // form.on('file', function (name, file){
    //     console.log('Uploaded ' + file.name);
    // });
    res.send({"message":"File Uploaded Successfully !"});
});




module.exports = router;