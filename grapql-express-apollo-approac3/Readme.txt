In a new project, 
  npm install apollo-server-express apollo-server-core express graphql


Step 1:
---
in server.js 

  // Refer : How to use Apollo Server with Express JS 
  // https://www.apollographql.com/docs/apollo-server/integrations/middleware/
  // The following is for Apollo Server v3 - recently released.

  const express = require('express');
  const http = require('http');
  const { ApolloServer } = require('apollo-server-express');
  const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core');

  const { typeDefs } = require('./Schemas/TypeDefs/TypeDefs');
  const { resolvers } = require('./Schemas/Resolvers/Resolvers');

  async function startApolloServer(typeDefs, resolvers) {
    // Required logic for integrating with Express
    const app = express();
    const httpServer = http.createServer(app);

    // Same ApolloServer initialization as before, plus the drain plugin.
    const server = new ApolloServer({
      typeDefs,
      resolvers,
      plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    });

    // More required logic for integrating with Express
    await server.start();
    server.applyMiddleware({
      app,

      // By default, apollo-server hosts its GraphQL endpoint at the
      // server root. However, *other* Apollo Server packages host it at
      // /graphql. Optionally provide this to match apollo-server.
      path: '/',
    });

    // Modified server startup
    await new Promise(resolve => httpServer.listen({ port: 4000 }, resolve));
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
  }

  startApolloServer(typeDefs, resolvers);


Step 2: 
===
 Have Schemas/TypeDefs/TypeDefs.js
  
  const { gql } = require("apollo-server-express");

  const typeDefs = gql`

    #Custom Data Types
    type User{
      id: Int,
      name: String,
      phone: String
    }

    #Queries
    type Query {
      hello: String
      getUserList: [User]
    }

    type Mutation{
      createUser(name: String, phone: String): User 
      #name and phone are args in the above line
    }
  `;

  module.exports = {typeDefs};

Step 3:
=====
 Have Schema/Resolvers/Resolvers.js 

  const resolvers = {
    Query: {
      hello(){
        return 'Hey!'
      },
      getUserList(){
        // db query
        return [{
          id: 1,
          name: "Arun",
          phone: "234234"
        }]
      }
    },
    Mutation: {
      createUser(parent, args){
        console.log(args);
        return {
          id: 999,
          name: args.name,
          phone: args.phone
        }
      }
    }
  }

  module.exports = { resolvers };


Step 5:
===
  Try the following 
  
  query {
    getUserList  { 
      id
      name
      phone
    }
  }
  # if you are not happy with getUserList as prop -- you can use aliases. Refer the next query 


  query {
    users: getUserList  { #users is an alias - getUserList is a query 
      id
      name
      phone
    }
  }

Step :
====
  You can work on Mutations


  ======

  GraphQL - Apollo - Subscriptions Tutorial
  =====

This section details how to set up a GraphQL server to support 
subscriptions based on graphql subscriptions and subscriptions-transport-ws.

Ws - is Websocket 

We will use the PubSub implementation from graphql-subscriptions,
and we will connect it to subscribe executor of graphql, 
and publish the data using subscriptions-transport-ws 
(a WebSocket server and client library for GraphQL that can be used directly 
in a JavaScript app or wired up to a fully-featured GraphQL client 
like Apollo or Relay.)

The process of setting up a GraphQL subscriptions server consist of the 
following 4 main steps:

1. Declaring subscriptions in the GraphQL schema
2. Setup a PubSub instance that our server will publish new events to
3. Hook together PubSub event and GraphQL subscription.
4. Setting up SubscriptionsServer, a transport between the server 
    and the clients

Time Required to Complete: More than an hour. 

All the above steps with sub-steps are neatly documented here in the 
following link.
Continue with the steps by refering a bigger multi page tutorial here 
  https://www.apollographql.com/docs/graphql-subscriptions/

