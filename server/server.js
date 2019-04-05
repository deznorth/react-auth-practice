const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const config = require('./config/config.json');

const isDev = process.env.NODE_ENV !== 'production';
const port  = process.env.PORT || 5000;


// Configuration
// ================================================================================================

// Set up Mongoose
mongoose.connect(isDev ? config.db_dev : config.db, { useNewUrlParser: true });
mongoose.Promise = global.Promise;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// API routes
require('./routes')(app);

app.use(express.static(path.resolve(__dirname, '../build')));

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