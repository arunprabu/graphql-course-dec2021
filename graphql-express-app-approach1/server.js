const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql'); // scroll to the bottom to know disadvantages

const app = express();
const port = 3000;
// This approach is using SDL 

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

  type Mutation{
    createContact(name: String, phone: String): String
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
      city: "Mirontsi"
    }, {
      id: 2,
      
      city: "Mrongi Daja"
    }, {
      id: 3,
      
      city: "Chosica"
    }];

    return users;
  },
  createContact: ({name, phone}) => {
    console.log(name);
    console.log(phone);

    return `${name} with ${phone} has been added into the contact book`;
  }
}

/*
Test your mutations from graphiql 
mutation {
  createContact(name: "Kevin", phone: "243424124")
}

*/

app.use('/graphql', graphqlHTTP({
  schema: schema, // Schema is now setup properly
  rootValue: rootResolver,
  graphiql: true // enabling graphiql client tool to connect with graphQL server app
}));

//GraphiQL is an in-browser tool for writing, validating, and testing GraphQL queries.

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});


/* Limitations /Disadvantages of Approach #1 
  The buildSchema function takes a schema in SDL (schema definition language) 
  and returns a GraphQLSchema object. 
  Given two identical schemas generated with each method, 
  runtime performance would be the same. 
  Startup time for a server using buildSchema would be slower since parsing the SDL adds 
  an extra step that would not otherwise exist.

  Using buildSchema is generally inadvisable, as it severely limits the functionality of your schema.

  A schema generated using buildSchema:

    * Cannot specify resolve functions for individual fields
    * Cannot specify either resolveType or isTypeOf properties for Types, making it impossible to use Unions and Interfaces
    * Cannot utilize custom scalars

  Refer: https://stackoverflow.com/questions/53984094/notable-differences-between-buildschema-and-graphqlschema

*/