const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

const app = express();
const port = 3000;

const schema = buildSchema(`
  """
    Custom data types | Object types defined
  """
  type User{
    id: Int,
    name: String,
    city: String
  }
  
  """
    Here's the query defined -- this is comment in schema
  """

  type Query{
    hello: String,
    age: Int,
    quoteOfTheDay: String,
    greet(name: String): String,
    registeredUserList: [String],
    user(id: Int): User,
    usersList: [User]
  }
`);

// You need to resolve API's -- so that you can return data to the client
// Setting up root resolver for all api endpoints
const rootResolver = { 
  hello: () => {
    // this is the ideal place for you exec db query
    return 'Hello World';
  },
  age: () => {
    return 20;
  },
  quoteOfTheDay: () => {
    // using Math.random going to return one of the two quotes
    return Math.random() < 0.5? 'Never give up': 'Do not wait for the right time. Create it';
  },
  greet: (args) => {
    console.log(args); // args -- an Object
    console.log(args.name);
    return `Hello ${args.name}!!!!`;
  },
  registeredUserList: () => {
    const usersList = [ 'Steve', 'Tim', 'Mark'];
    return usersList;
  },
  user: ({id}) => { // using object destructuring to get only id
    console.log(id);
    const userInfo = {
      id: id,
      name: 'Di',
      city: 'Mirontsi'
    }
    return userInfo;
  },
  usersList: () => {
    const users = [{
      id: 1,
      name: "Di",
      city: "Mirontsi"
    }, {
      id: 2,
      name: "Tootsie",
      city: "Mrongi Daja"
    }, {
      id: 3,
      name: "Clement",
      city: "Chosica"
    }];

    

    return users;
  }


}

app.use('/graphql', graphqlHTTP({
  schema: schema, // Schema is now setup properly
  rootValue: rootResolver,
  graphiql: true // enabling graphiql client tool to connect with graphQL server app
}));

//GraphiQL is an in-browser tool for writing, validating, and testing GraphQL queries.

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});

