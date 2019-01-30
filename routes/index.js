const express = require('express');
const router = express.Router();

//ROUTES

// Root route
router.get('/', (req, res) => {
    const name = req.cookies.username;
    if (name) {
        // Respond/send info to the site (alternative {name: name})
        res.render('index', { name });
    } else {
        // If cookie is not found, redirect to view form route
        res.redirect('/hello');
    }
});

// Hello route GET
router.get('/hello', (req, res) => {
    const name = req.cookies.username;
    if (name) {
        // If cookie is found, redirect to home route
        res.redirect('/');
    } else {
        res.render('hello');
    }
});

// Hello route POST
router.post('/hello', (req, res) => {
    // Set the response object's cookie
    res.cookie('username', req.body.username);

    res.redirect('/');
});

// Goodbye route POST
router.post('/goodbye', (req, res) => {
    res.clearCookie('username');
    res.redirect('/hello');
});

// Test route (not part of this project)
router.get('/sandbox', (req, res) => {
    const names = [
        { FirstName : "Robert", LastName : "Maidla"},
        { FirstName : "FJack", LastName : "LJones"},
        { FirstName : "FSfdsf", LastName : "Lgfdd"},
        { FirstName : "Fsdffsg", LastName : "Lsdsdg"},
        { FirstName : "Frgeg", LastName : "Lgfsgs"},
    ];
    
    res.locals.names = names;
    console.log(names);
    //Render template
    res.render('../sandbox/sandbox');
});

module.exports = router;