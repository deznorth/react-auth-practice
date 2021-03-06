const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const config = require('./config/config.json');

const isDev = process.env.NODE_ENV !== 'production';
const port  = process.env.PORT || 5000;

//routes
const signinRoutes = require('./routes/api/signin');


// Configuration
// ================================================================================================

// Set up Mongoose
mongoose.connect(isDev ? config.db_dev : process.env.DB_URL, { useNewUrlParser: true });
mongoose.Promise = global.Promise;

const app = express();

// Set up a whitelist and check against it:
var whitelist = ['https://testfixdavidr.herokuapp.com/', 'http://testfixdavidr.herokuapp.com/']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, '../build')));

// API routes
app.use('/api/account/', signinRoutes);

app.get('*', function (req, res) {
    res.sendFile(path.resolve(__dirname, '../build/index.html'));
});

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  }
  console.info('>>> 🌎 Open http://localhost:%s/ in your browser.', port);
});

module.exports = app;