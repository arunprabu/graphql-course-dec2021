const graphqlFields = require('graphql-fields');

const resolvers = {
  Query: {
    hello(){
      return 'Hey!'
    },
    getUserList(){
      // db query
      // if you have db query -- try with async await 
      return [{
        id: 1,
        name: "Arun",
        phone: "234234"
      },
      {
        id: 2,
        name: "John",
        phone: "324342"
      },
      {
        id: 31,
        name: "Steve",
        phone: "445367"
      }]
    },
    user(parent, args, context, info){
      console.log(args);
      let infoObj = graphqlFields(info); // obj 
      console.log(Object.keys(infoObj)); // you can all keys here like ['id', 'name', 'phone']

      return {
        id: 1,
        name: "Arun",
        phone: "234234"
      }
    }
  },
  Mutation: {
    createUser(parent, args){
      console.log(args);
      return {
        id: 999,
        ...args
      }
    }
  }
};

module.exports = { resolvers };