const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');

const User = require('../../models/User');

const configFile = require('../../config/config.json');
const saltRounds = configFile.saltRounds;
const jwtSecret = configFile.jwtSecret;

//Register
router.post('/signup', (req,res) => {
    const { body } = req;
    const {
        username,
        password: plainPassword
    } = body;

    const newUser = {
        username: username
    }

    bcrypt.hash(plainPassword, saltRounds, (err, hash) => {
        if(err){
            console.log('Error while hashing password');
            res.status(500).json({
                success: false,
                message: `Failed to register user ${username}`,
                error: err
            });
        } else {

            newUser.password = hash;

            User.create(newUser, (err, newuser) => {
                if(err){
                    console.log('Error while creating user');
                    if(err.errors.username){
                        res.status(500).json({
                            success: false,
                            message: `Error: Username "${username}" already exists`
                        });
                    } else {
                        res.status(500).json({
                            success: false,
                            message: `Failed to register user ${username}`,
                            error: err
                        });
                    }
                    
                } else {
                    res.status(200).json({
                        success: true,
                        message: `Successfully registered user ${username}`
                    })
                }
            });
        }
    });
});

//Login
router.post('/login', (req,res) => {
        
    if(!(req.body.username && req.body.password)){
        res.json({
            success:false,
            message:'Username & password are required'
        });
        res.end();
    } else {

    const { username, password } = req.body;

    User.findOne({username: username}, (err, user) => {
        if(err || !user){
            res.json({
                success: false,
                message: `User "${username}" does not exist.`
            });
        } else {
            bcrypt.compare(password, user.password, (err, result) => {
                if(err){
                    console.log(err)
                } else {
                    if(!result){
                        res.json({
                            success: false,
                            message: 'Incorrect password'
                        });
                    } else {
                        const token = jwt.sign({user: username}, jwtSecret);
                        res.json({
                            success:true,
                            message: `Welcome back ${username}`,
                            token: token
                        });
                    }
                }
            });
        }
    });
}
});

//test api route
router.get('/test', auth.checkToken, (req,res) => {
    res.send('hello there!');
});

module.exports = router;