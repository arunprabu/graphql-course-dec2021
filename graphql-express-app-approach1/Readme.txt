Problem in REST API 
====
  * Overfetching / underfetching 
  * sometimes Multiple API calls needed to get exact data
  

====
What is a Schema? Schema is a combination of query and mutation

In GraphQL everything in strongly-typed.

Types that Schema can include are
 1. Scalar Types 
      Similar to Primitive types 
      Examples: Int, Float, String, Boolean, ID (Unique Identifier)

 2. Object Types 
      * Will contain collection of fields aka properties. 
      * Each field / property can be of Scalar Type or another Object Type 

      Examples: 
      type Book {
        title: String,
        genre: String,
        author: Author
      }

      type Author {
        name: String
      }

 3. Query Types 
      * Used for READ Operations in GraphQL.
      * it defines what GraphQL READ Operation execute against your data graph. 
      
      Examples: 
      type Query{
        hello: String, // hello is a field/property and String is the return type of the data
        age: Int,
        greet(name: String): String, 
      }

      You can structure queries from GraphiQL Client like the following 
      {
        hello,
        age,
        greet(name: "Arun")
      }

 4. Mutation Types 
      * For CREATE, UPDATE, DELETE Operations 
      Example: 
      type Mutation {
        addUser(name: String, city: String, age: Int): User  // return type is User is a custom type 
      }

      How to call the above from GraphQL Client? 
      mutation {
        addUser( name: "Arun", city: "Toronto" , age: 20){
          // can specify the needed fields 
        }
      }
  
 5. Input Types 
      * Instead of passing many arguments in the above query one by one, 
      we can make one custom type called input type for it. 
      * it will be cleaner and optimized

      Example:
      type Mutation {
        addUser(UserInput): User  // return type is UserInput is an Input Type 
      }

      input UserInput{ // this should be defined with input prefix 
        name: String, 
        city: String, 
        age: Int
      }

=======

Few more to know
---
  Field Nullability 

  If you want some fields to be optional, that are not mandatory for returning values, 
  have the query like the following 

  type Book {
    title: String,
    genre: String!, // this field is optional 
    author: Author
  }

--------

Note: Query to execute if you have a fn 

{
  greet(name: "Arun") 
}


======
Now, it is time to refer:
https://graphql.org/code/#javascript

  On the Server side 
  ===========

  #1 Running GraphQL in a Node.js environment
      https://graphql.org/graphql-js/

  #2 GraphQL API server over an Express webserver. 
      https://graphql.org/graphql-js/running-an-express-graphql-server/

  #3 GraphQL server packages from Apollo that work with 
      various Node.js HTTP frameworks like Express 
      https://www.apollographql.com/docs/apollo-server/


  On the client Side 
  ================
  #1 Using Apollo Client  (We will have demo of this one only)
      A powerful JavaScript GraphQL client, designed to work well with React, 
      React Native, Angular 2, or just plain JavaScript.
      http://apollographql.com/client/ 

  #2 Using Facebook Relay ( You learn this separately)
      Facebook's framework for building React applications that 
      talk to a GraphQL backend.
      https://facebook.github.io/relay/


Limitations of buildSchema approach
---
The buildSchema function takes a schema in SDL (schema definition language) and returns a GraphQLSchema object. Given two identical schemas generated with each method, runtime performance would be the same. Startup time for a server using buildSchema would be slower since parsing the SDL adds an extra step that would not otherwise exist -- whether there would be a noticeable difference, I can't say definitively.

Using buildSchema is generally inadvisable, as it severely limits the functionality of your schema.

A schema generated using buildSchema:
 * Cannot specify resolve functions for individual fields. You can't get context and info.
 * Cannot specify either resolveType or isTypeOf properties for Types, making it impossible to use Unions and Interfaces
 * Cannot utilize custom scalars

===