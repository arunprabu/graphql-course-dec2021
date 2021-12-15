const { GraphQLString, GraphQLInt } = require("graphql")
const UserType = require("../TypeDefs/User")

exports.CREATE_USER = {
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
}

exports.UPDATE_USER = {
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
}

exports.DELETE_USER = {
  type: GraphQLString,
  args: {
    id: {type: GraphQLInt}
  },
  resolve(parent, args){
    return `User with an id ${args.id} deleted successfully`;
  }
}