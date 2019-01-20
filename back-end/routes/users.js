const express = require('express');
const router = express.Router();
const Users = require('../models/users');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const checkAuth = require('../auth/check-auth');

// login a user from mongodb
router.post('/login', function(req, res, next){
    Users.find().then( function(users) {
        console.log(users);
    });
    Users.findOne({email: req.body.email}).then(function(user){
        // if( user.length < 1) {
        //     return res.status(401).json({
        //         message: 'Auth Failed'
        //     })
        // }
        bcrypt.compare(req.body.password, user.password, (err, result) => {
            if(err) {
                return res.status(401).json({
                    message: 'Auth Failed'
                });
            }
            if(result) {
                const token = jwt.sign({
                    email: user.email,
                    userId: user._id
                },
                process.env.JWT_WEB_TOKEN,
                {
                    expiresIn : '1h'
                }
            );
            let tokenData = jwt.verify(token, process.env.JWT_WEB_TOKEN);
                if(!isEmpty(tokenData)) {
                    return res.status(200).json({
                        message: 'Auth Successful', 
                        token: token,
                        status: 200,
                        userData: tokenData
                    })
                }
            }
            return res.status(401).json({
                message: 'Auth Failed'
            });
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err,
        });
    });
});

function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

// logout or destroy a user session from jwt service
router.post('/logout', checkAuth, function(req, res, next){
    if(isEmpty(req.body)) {
        return res.status(200).json({
            message: 'Logout Successful', 
            status: 200
        });
    } else{
        return res.status(401).json({
            message: 'Token does not exist'
        });
    }
});

// signup a new user with default permissions in mongodb
router.post('/signup', function(req, res, next){
    Users.find({email: req.body.emailAddress}).exec().then( user => {
        if(user.length >= 1) {
            return res.status(422).json({
                message: 'Email Id already exist'
            });
        } else{
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                console.log(req.body);
                if(err) {
                    return res.status(500).json({
                        error: err 
                    });
                } else{
                    const newUser = new Users({
                        _id: new mongoose.Types.ObjectId(),
                        email: req.body.emailAddress,
                        password: hash
                    });
                    newUser.save()
                    .then( result => {
                        console.log(result);
                        res.status(201).json({
                            message:  'User created',
                            status: 201
                        })
                    }).catch(err => {
                        console.log(err);
                        res.status(500).json({
                            error: err,
                        });
                    });
                }
            });
        }
    });
});

module.exports = router;