const fs = require('fs');
const express = require('express');
const { ApolloServer } = require('apollo-server-express');

let aboutMessage = "Issue Tracker API v1.0";


const resolvers = {
  Query: {
    about: () => aboutMessage,
  },
  Mutation: {
    setAboutMessage,
    // ES2015:Eequivalent to
    // setaboutMessage: setAboutMessage,
  },
};

function setAboutMessage(_, {message}){
  return aboutMessage = message;
};

const server = new ApolloServer({
  typeDefs: fs.readFileSync('./server/schema.graphql', 'utf-8'),
  resolvers,
});

// Middleware is a functin that takes in an http request and response
// object and the next middleware function in the chain
// express.static responds

//first arg to use() is '/' by defauldt if not specified
// app.use('/', fileServerMiddleware);

const app = express();


app.use(express.static('public'));
//Express.static('public')
// This returns a middlware function that is configured to use the directory
// public to look for static files

server.applyMiddleware({app, path: "/graphql"});

app.listen(3000, function() {
  console.log('App started on port 3000');
});
