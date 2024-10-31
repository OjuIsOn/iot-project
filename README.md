<!-- first login to mongodb :
    1.You can do it online 
    2.Install locally 
    3.add the connection string in env file (make it a string)


then type 
npm install in the terminal and then follow the below steps



steps to run it:
    connect or start database:mongo
    run app.js 
    type: localhost:8001 in the chrome you would see the homepage
    then to register 
    type:localhost:8001/api/user/register

    then for login
    type: localhost8001/api/user/login


    i have added tokens ,we are using cookies for authentication

if you have registered then you might get directed to login page then you have to login again as register will just create the account

i haven't added anything in controller , we would organise every fucntion later let's just make it work first/.

for frontend views folder contains all the required web pages that would be visible to user



routes:
        get--   /                       home page
        /api/user                       for user login and auth
        post----/api/user/register          for new user login
        post----/api/user/login             for login if already registered
        get-----/api/user/history           to get history of a user 

    /api/cycle                  for cycle routes from here do whateven you want


just to specification 
  post-  /api/cycle/lock             for locking
  post-  /api/cycle/unlock           for unlocking
  post-  /api/cycle/addCycle         for adding a new cycle
 -->



just run app.js file 
open chrome and type 
http://localhost:8001