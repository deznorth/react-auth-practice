const express = require('express');
const jwt = require('jsonwebtoken');
const configFile = require('../config/config.json');
const jwtSecret = configFile.jwtSecret;


const auth = {};

auth.checkToken = (req,res,next) => {
    if(req.query.token){
        jwt.verify(req.query.token, jwtSecret, (err, decoded) => {
            if(err){
                res.json({
                    success: false,
                    message: 'Invalid Token'
                });
            } else {
                next();
            }
        });
    } else {
        res.status(401).json({
            success: false,
            message: 'Must use token'
        });
    }
}

module.exports = auth;