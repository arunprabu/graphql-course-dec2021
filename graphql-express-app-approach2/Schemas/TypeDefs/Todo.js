const { GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLBoolean } = require("graphql");

const TodoType = new GraphQLObjectType({
  name: 'Todo',
  fields: () => ({
    id: { type: GraphQLInt },
    userId: { type: GraphQLInt },
    title: { type: GraphQLString },
    completed: { type: GraphQLBoolean }
  })
});

module.exports = TodoType;