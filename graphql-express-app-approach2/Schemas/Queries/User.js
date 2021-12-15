const { GraphQLList, GraphQLInt } = require('graphql');
const UserType = require('../TypeDefs/User');

const usersListJSON = require('../../data/users-data.json'); // loading the users data

exports.GET_USER_LIST = {   // get all users
  description: "get all users in an array",
  type: new GraphQLList(UserType),
  resolve(parent, args, context, info) {
    console.log('Sending List of User Type');
    return usersListJSON; // returning the JSON data
  }
}

exports.GET_USER_BY_ID = {  // get user by id 
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
}