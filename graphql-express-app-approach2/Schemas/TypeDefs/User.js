const { GraphQLObjectType, GraphQLInt, GraphQLString } = require("graphql");

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

module.exports = UserType;