var path = require('path');
var express = require('express');
var render = require('./render');
var app = express();

app.use(express.static('_site'));

app.get('*', function(req, res, next) {
  var location = req.url.slice(1);

  location = location || 'index.html';
  res.type(path.extname(location) || '.html');

  render(location)
    .then(function(file) {
      res.send(file.contents.toString('utf8'));
    })
    .catch(function(err) {
      next(err);
    });
});

app.use(function(err, req, res, next) {
  var status = err.status || 500;
  var message = '<!DOCTYPE html>'
    + '<html lang="en">'
    + '<head><meta charset="utf-8"></head>'
    + '<body>' + err.message + '</body>'
    + '</html>';

  console.log(err.stack);
  res.status(status).send(message);
});

module.exports = app;
