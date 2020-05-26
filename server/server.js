const fs = require('fs');
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');

let aboutMessage = "Issue Tracker API v1.0";

const issuesDB = [
  {
    id: 1,
    status: "New",
    owner: "kenny",
    effor: 5,
    created: new Date('2020-01-01'),
    due: new Date('2020-01-01'),
    title: "Error Task 1"
  },
  {
    id: 2,
    status: "New",
    owner: "Bob",
    effor: 5,
    created: new Date('2020-01-01'),
    due: new Date('2020-01-01'),
    title: "Error Task 2"
  }
];

const GraphQLDate = new GraphQLScalarType({
  name: "GraphQLDate",
  description: 'A date type in Graphql as a scalar',
  serialize(value) {
    return value.toISOString();
  },
  parseValue(value) {
    return new Date(value);
  },
  parseLiteral(ast) {
    return (ast.kind == Kind.STRING) ? new Date(ast.value) : undefined;
  },
});


const resolvers = {
  Query: {
    about: () => aboutMessage,
    issueList,
  },
  Mutation: {
    setAboutMessage,
    // ES2015:Eequivalent to
    // setaboutMessage: setAboutMessage,
    issueAdd,
  },
  GraphQLDate,
};

function setAboutMessage(_, {message}){
  return aboutMessage = message;
};

function issueAdd(_, { issue }) {
  issue.created = new Date();
  issue.id = issuesDB.length + 1;
  if (issue.status == undefined) {
    issue.statud = "New";
  }
  issuesDB.push(issue);
  return issue;
}

function issueList(){
  return issuesDB;
}

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
