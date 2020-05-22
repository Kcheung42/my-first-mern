const express = require('express');

const app = express();



// Middleware is a functin that takes in an http request and response
// object and the next middleware function in the chain
// express.static responds

//first arg to use() is '/' by defauldt if not specified
// app.use('/', fileServerMiddleware);

app.use(express.static('public'));

app.listen(3000, function() {
  console.log('App started on port 3000');
});


