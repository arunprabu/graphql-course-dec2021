const express = require('express');
// importing bodyParser to process req body
const bodyParser = require('body-parser');

const app = express();
const port = 3001;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// handling / - GET 
app.get('/', (req, res) => {
  console.log('Req Received');
  res.status(200).json({
    status: 'success',
    msg: 'Home Page works'
  });
});

// Read All Users  /api/users - GET 
app.get('/api/users', (req, res) => {

  // ideal places exec db query 

  res.json([
    { id: 1, name: 'Arun', city: 'Toronto' },
    { id: 2, name: 'Steve', city: 'Sydney' }
  ]);
});

// Create USER /api/users - POST
app.post('/api/users', (req, res) => {
  // get the req body
  console.log(req.body);

  // ideal place for you to exec db query
  res.json({
    status: 'User Create Successfully',
    id: 3,
    ...req.body
  });
});

// Get user details -- URL Param is userId - GET 
app.get('/api/users/:userId', (req, res) => {

  console.log(req.params); // reading URL params

  res.json({
    id: req.params.userId,
    name: 'Arun',
    city: 'Toronto'
  });
});

// Update user Details - URL Param is userId - PUT 
app.put('/api/users/:userId', (req, res) => {

  console.log(req.params); // reading URL params
  console.log(req.body); // reading req body also. 

  res.json( {
    status: 'Updated Successfully'
  });
});

// delete user  - URL Param is userId - DELETE  
app.delete('/api/users/:userId', (req, res) => {

  console.log(req.params); // reading URL params
  
  res.json( {
    status: 'Deleted Successfully'
  });
});

app.listen(port, () => {
  console.log(`Server is started. Goto http://localhost:${port}`);
});
