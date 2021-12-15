const { gql } = require("apollo-server-express");

const typeDefs = gql`
  
  # custom data type for users feature
  type User{
    id: Int,
    name: String,
    phone: String
  }

  #first query here
  type Query {
    hello: String,
    getUserList: [User],
    user(id: Int): User
  }

  type Mutation {
    createUser(name: String, phone: String): User
  }
`;

module.exports = { typeDefs };

