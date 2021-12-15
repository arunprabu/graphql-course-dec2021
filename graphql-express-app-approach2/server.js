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
const schema = require('./Schemas');

const app = express();
const PORT = 3001;

app.use('/graphql', graphqlHTTP({
  schema: schema, // Schema is now properly setup for this
  graphiql: true // graphiql is a client
}));

// GraphiQL is an in-browser tool for writing, validating, and testing GraphQL queries.

app.listen(PORT, () => {
  console.log(`GraphQL NodeJS App is running on http://localhost:${PORT}/graphql`);
});