const express = require('express');

const app = express();

const fileServerMiddleware = express.static('public');

//first arg to use() is '/' by defauldt if not specified
// app.use('/', fileServerMiddleware);

app.use(express.static('public'));

app.listen(3000, function() {
  console.log('App started on port 3000');
});
