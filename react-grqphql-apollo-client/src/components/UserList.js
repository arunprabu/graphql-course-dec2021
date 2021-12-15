import { gql, useQuery } from "@apollo/client";

function UserList(){

  const GET_USER_LIST = gql`
    query{
      users: getUserList {
        id
        name
        phone
      }
    }
  `;

  const { loading, error, data } = useQuery(GET_USER_LIST);
  
  if(loading){
    return(
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    )
  }

  if(error){
    <p>Sorry. Some error occured. Try again later</p>
  }

  let userCards = null; 
  if(data){
    userCards = data.users.map( (user) => {
      return(
        <div className="col-md-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">{user.name}</h5>
              <h6 className="card-subtitle mb-2 text-muted">{user.phone}</h6>
            </div>
          </div>
        </div>
      )
    })
  }

  return(
    <div className="container">
      <h2>User List</h2>

      <div className="row">

        { data.users && data.users.length > 0? 
          userCards
          :
          <div className="alert alert-warning">
            Unable to Load users
          </div>
        }
        
      </div>

    </div>
  )
}

export default UserList;