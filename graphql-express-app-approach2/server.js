/*
  Approach #1 - using GraphQLSchema
  GraphQLSchema based appraoch doesn't use Schema Defn Lang (SDL)  
  It creates the schema programmatically
  This approach has more advantags. 
  Notable one is you can get 'info' param in resolver to read the requested fields in query
*/

// Further Reading for Types 
// https://graphql.org/graphql-js/type/

const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList, GraphQLBoolean } = require('graphql');
const axios = require('axios');

const app = express();
const PORT = 3001;

const usersListJSON = require('./data/users-data.json'); // loading the users data

// Custom Type for User Data 
const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    phone: { type: GraphQLString },
    email: { type: GraphQLString }
  })
});

const TodoType = new GraphQLObjectType({
  name: 'Todo',
  fields: () => ({
    id: { type: GraphQLInt },
    userId: { type: GraphQLInt },
    title: { type: GraphQLString },
    completed: { type: GraphQLBoolean }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  description: 'Welcome to GraphQL Queries',
  fields: {
    hello: { // graphql api
      description: 'Hit this to get Hello World!',
      type: GraphQLString, // return type
      resolve() {  // our resolver
        return 'Hello World!'
      }
    },
    age: {
      type: GraphQLInt,
      deprecationReason: 'Removed because of another implementation. Use getAge',
      resolve() {
        // ideal place for you to exec db query
        return 20;
      }
    },
    getAge: {
      type: GraphQLInt,
      description: 'Introducing getAge so age is deprecated',
      resolve() {
        // ideal place for you to exec db query
        return 20;
      }
    },
    greet: {
      type: GraphQLString,
      description: 'Pass an arg name of type string to get a formal greeting!',
      args: {
        name: { // name of the argument
          type: GraphQLString // data type of the arg
        }
      },
      resolve(parent, args) {
        console.log(args); // args - an obj. 
        console.log(args.name);
        return `Hello ${args.name}`;
      }
    },
    userList: {
      description: "get all users in an array",
      type: new GraphQLList(UserType),
      resolve(parent, args, context, info) {
        console.log('Sending List of User Type');
        return usersListJSON; // returning the JSON data
      }
    },
    user: {
      description: "fetch one user by id.",
      type: UserType,
      args: {
        id: {
          type: GraphQLInt // data type of id arg is int
        }
      },
      resolve(parent, args) {
        console.log(args);
        let id = args.id;
        let usersList = usersListJSON.filter((userData) => {

          if (userData.id == id) {
            return userData;
          }
        });
        console.log(usersList); // array of obj
        return usersList[0];
      }
    },
    todos: {
      description: "get all users in an array",
      type: new GraphQLList(TodoType),
      async resolve(){
        // handing over the req to jsonplaceholder rest api
        // npm i axios
        // axios is the REST API Client tool 
        // either follow the promise -- for that remove async from resolve method
        /* return axios.get('https://jsonplaceholder.typicode.com/todos')
                .then(function (response) {
                  // handle success
                  console.log(response);
                  return response.data;
                })
                .catch(function (error) {
                  // handle error
                  console.log(error);
                })
                .finally(function () {
                  // always executed
                  console.log('It is over');
                });
        */

        // or else async/await
        const response = await axios.get('https://jsonplaceholder.typicode.com/todos');
        return response.data;
      }
    }
  }
})

// Let's on Mutation
const RootMutation =  new GraphQLObjectType({
  name: "RootMutation",
  fields: {
    // handling create user
    createUser: {
      type: UserType,
      args: {
        name: {type: GraphQLString},
        phone: {type: GraphQLString},
        email: {type: GraphQLString}
      },
      resolve(parent, args){
        // you can try connecting with db and save the data
        return {
          id: 999,
          ...args // spreading the entire args obj 
        }
      }
    },
    updateUser: {
      type: UserType,
      args: {
        id: { type: GraphQLInt },
        name: {type: GraphQLString},
        phone: {type: GraphQLString},
        email: {type: GraphQLString}
      },
      resolve(parent, args){
        // you can try connecting with db and save the data
        return args;
      }
    },
    deleteUser: {
      type: GraphQLString,
      args: {
        id: {type: GraphQLInt}
      },
      resolve(parent, args){
        return `User with an id ${args.id} deleted successfully`;
      }
    }
  }
})

const schema = new GraphQLSchema({
  // it expects query and mutation inside
  query: RootQuery, // we have to create RootQuery for the whole app.
  mutation: RootMutation
});

app.use('/graphql', graphqlHTTP({
  schema: schema, // Schema is now properly setup for this
  graphiql: true // graphiql is a client
}));

// GraphiQL is an in-browser tool for writing, validating, and testing GraphQL queries.

app.listen(PORT, () => {
  console.log(`GraphQL NodeJS App is running on http://localhost:${PORT}/graphql`);
});