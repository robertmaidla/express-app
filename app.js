const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();
const port = 3000;

// Use bodyParser to parse incoming data to better format
app.use(bodyParser.urlencoded({ extended: false }));
// Use cookieParser to parse incoming cookies to more usable format
app.use(cookieParser());
// Serve static files
app.use('/static', express.static('public'));
// Tell express which template engine to use
app.set('view engine', 'pug');

// Import routes. index.js will be loaded by default if only dir is set
const mainRoutes = require('./routes');
const cardRoutes = require('./routes/cards');
app.use(mainRoutes);
// Handle '/cards' route
app.use('/cards', cardRoutes);

// Handle 404 (if no middleware has caught the route)
app.use((req, res, next) => {
    const err = new Error('Not found');
    err.status = 404;
    next(err);
});

// Error middleware (any errors by middleware functions are directed here)
app.use((err, req, res, next) => {
    res.locals.error = err;
    res.status(err.status);
    res.render('error');
});

// Run the server
app.listen(port, () => {
    console.log(`The application is running on localhost:${port}`);
});
