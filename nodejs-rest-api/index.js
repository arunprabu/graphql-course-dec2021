const http = require('http'); // importing http module

http.createServer((req, res) => {
  console.log('Req Received. Processing Res');
  
  // Server Side Rendering
  /* res.setHeader("Content-Type", "text/html");
  res.write(`<html>
    <head><title>First NodeJS App</title></head>
    <body>
      <h1 style='color: red;'>Success</h1>
      <a href="/">Home</a>
      <script>alert('test');</script>
    </body>
  </html>`); */
  
  console.log(req.url);

  res.setHeader("Content-Type", "application/json");
  switch(req.url){
    case '/':
      // REST API 
      res.write( JSON.stringify({
        status: 'Success',
        info: 'Home Page works'
      }));
      break;
    
    case '/api/users':
      if(req.method == 'GET'){
        let usersList = [
          { name: 'John', city: 'Sydney'},
          { name: 'Steve', city: 'Toronto'}
        ];
        res.write( JSON.stringify(usersList));
      }else if(req.method == 'POST'){
        res.statusCode = 201;
        res.write( JSON.stringify({
          msg: 'Saved Successfully'
        }));
      }
      
      break;
    
    default: 
      res.statusCode = 404;
      res.write( JSON.stringify({
        status: 'Page Not Found',
        info: 'Invalid Page'
      }));
  }

  res.end();
  console.log('Res Sent.');
}).listen(3000);
