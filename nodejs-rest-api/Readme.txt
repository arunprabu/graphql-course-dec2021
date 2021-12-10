Webapps
---
  1. Server Side Rendering Apps (SSR) 
      Codebase: HTML, CSS, JS, Java, MySQL 
      Resp: HTML, CSS, JS, Data 
      1 Server 

  2. Client Side Rendering Apps (CSR)
    
      2 Server 
        1 Front End Server (localhost:8080) - SPA 
            FrontEnd Project Codebase: HTML, CSS, JS 
            Resp: HTML, CSS, JS, wait for the data

            SPA Frameworks/Libraries: ReactJS, Angular 2+, VueJS 

        1 Back End Server (localhost:4000)  - REST API 
            Back End Project Codebase: NodeJS, ExpressJS 
            Resp: JSON (Data)
        
        Browser 
          localhost:8080  
            HTML, CSS, JS => (req for the data) => localhost:4000
                                                <= JSON 

Following Apps can use REST API, GraphQL App 
=====
  Front End App, 
  Mobile Apps,
  Tablet Apps,
  TV Apps,
  Smartwatch Apps,
  Desktop Apps (Electron JS)



HTTP Methods
=======
  Create User -  POST 
  Read Users  -  GET 
  Update User -  PUT / PATCH 
  Delete User -  DELETE 





