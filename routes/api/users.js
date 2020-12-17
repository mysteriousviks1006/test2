const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const User = require('../../models/user');


router.post('/signup', (req, res, next) => {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
                if(err == true){
                    return res.status(500).json({
                        error: 'Something went wrong'
                    });
                }else{
                    const user = new User({
                        _id: new mongoose.Types.ObjectId(),
                        name: req.body.name,
                        email: req.body.email,
                        password: hash,
                        createdAt: new Date().toISOString()
                    });

                    user.save()
                    .then(user => {
                        jwt.sign({ id: user._id }, 'mysecretkey', (err, token) => {
                            if(err){
                                return res.status(500).JSON({
                                    message: 'Authentication Failed'
                                });
                            }else{
                                res.status(200).json({
                                        user: {
                                            id: user._id,
                                            name: user.name,
                                            email: user.email
                                        },
                                        token: token
                                    })
                            }
                        })
                    })
                    .catch(er => {
                        res.status(500).json({
                            error: er
                        });
                    });

                }
                
            });
});

router.get('/', (req,res,next)=>{
    res.status(200).json({
        message: "this is get request"
    });
});

module.exports = router;