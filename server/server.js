const fs = require('fs');
const express = require('express');
const { ApolloServer, UserInputError } = require('apollo-server-express');
const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');

let aboutMessage = "Issue Tracker API v1.0";
const dateRegex = new RegExp('^\\d\\d\\d\\d-\\d\\d-\\d\\d');

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
    // for when the dates come in through variables
    // console.log("parseValue!");
    const date = new Date(value);
    return isNaN(date) ? undefined : date;
  },
  parseLiteral(ast) {
    // for when the dates come in the query string
    // console.log("parseLiteral!");
    if (ast.kind == Kind.STRING && dateRegex.test(ast.value)) {
      const date = new Date(ast.value);
      return isNaN(date) ? undefined : date;
    }
    return undefined;
  },
});


const resolvers = {
  Query: {
    about: () => aboutMessage,
    issueList,
  },
  Mutation: {
    setAboutMessage,
    issueAdd,
  },
  GraphQLDate,
};

function setAboutMessage(_, { message }){
  return aboutMessage = message;
};

function issueAdd(_, { issue }) {
  issueValidate(issue);
  issue.created = new Date();
  issue.id = issuesDB.length + 1;
  issuesDB.push(issue);
  return issue;
}

function issueList(){
  return issuesDB;
}

function issueValidate(issue) {
  const errors = [];
  if (issue.title.length < 3) {
    errors.push('Field "title" must be atleast 3 characters long');
  }
  if (issue.status == 'Assigned' && !issue.owner) {
    errors.push('Field "owner" is required when status is "Assigned"');
  }
  if (errors.length > 0) {
    throw new UserInputError('Invalid input(s)', { errors });
  }
}

const server = new ApolloServer({
  typeDefs: fs.readFileSync('./server/schema.graphql', 'utf-8'),
  resolvers,
  formatError: error => {
    console.log(error);
    return error;
  },
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
