// for RootQuery and Mutations
const { default: axios } = require("axios");
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList, GraphQLSchema } = require("graphql");
const { CREATE_USER, UPDATE_USER, DELETE_USER } = require("./Mutations/User");
const { GET_USER_LIST, GET_USER_BY_ID } = require("./Queries/User");
const TodoType = require("./TypeDefs/Todo");

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
    userList: GET_USER_LIST,
    user: GET_USER_BY_ID,
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
    createUser: CREATE_USER,
    updateUser: UPDATE_USER,
    deleteUser: DELETE_USER
  }
})

const schema = new GraphQLSchema({
  // it expects query and mutation inside
  query: RootQuery, // we have to create RootQuery for the whole app.
  mutation: RootMutation
});

module.exports = schema;