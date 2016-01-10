var express = require('express');
var render = require('./render');
var app = express();

app.use(express.static('_site'));

app.get('*', function(req, res, next) {
  var location = req.url.slice(1);

  location = location || 'index.html';

  render(location)
    .then(function(file) {
      res.send(file.contents.toString('utf8'));
    })
    .catch(function(err) {
      next(err);
    });
});

app.use(function(err, req, res, next) {
  if (err.status === 404) {
    res.send('404 ' + err.message);
  } else {
    next(err);
  }
});

module.exports = app;
