const express = require('express');
const User = require('../config/models/Users');

const router = express.Router();

// login page
router.get('/login', (req, res) => {
    res.render('Login');
})

// register page
router.post('/register', (req, res) => {
    // res.render('Register')
    // console.log(req.body);
    // res.send('hello')
    const {name, email, password, password2} = req.body;
    let errors = [];

    // check for required fields
    if (!name || !email || !password || !password2) {
        errors.push({msg: 'Please fill in all fields'});
    }

    // check passwords match
    if (password !== password2) {
        errors.push({msg: 'Passwords do not match'});
    }

    // check password length
    if (password.length < 6) {
        errors.push({msg: 'Passord should be at least 6 characters'})
    }

    if (errors.length > 0) {
        res.render('register', {
            errors,
            name,
            password, 
            password2
        })
    }

    User.findOne({email: email})
        .then(user => {
            if (user) {
                // found user => error
                errors.push({msg: "this user does exist"})
                res.render('register')
            } else {
                const newUser = new User({name, email, password});
            }
        })
        .catch(err => console.log(err))
})



module.exports = router;