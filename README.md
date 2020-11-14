![alt text](https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTPLoqEqtL8tOM9PTZJuavwSCVoGlsIauBsHA&usqp=CAU)

# instructions
* first create a user
* second login
* on login success you recive a token 
* put the token as value in the headers at authorization key
* start manipulate customer data

#### Technologies
* 'inversify' for the api
* typeorm for the entity
* db is as json


# test urls
##### usage
just import the file `dis.postman_collection.json`
to you postman

# Entities
### User
###### description
represent the user that will make the manipukation oin the consumer as a bank agency member
###### urls
* create user

        curl --location --request POST 'https://localhost:3000/user/register' \
        --header 'Content-Type: application/json' \
        --data-raw '{
            "email": "jacob@discount.com",
            "password": "123!",
            "name": "jacob"
        }'
 
 
 * get user by id 

        curl --location --request GET 'https://localhost:3000/customer?id=319908e0-2689-11eb-9abf-0badc508fed7' \
        --header 'authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiMjYzZWMwMzAtMjY4My0xMWViLTllNzQtOTUyYzFkOTJjZTgwIiwibmFtZSI6ImphY29iIiwiZW1haWwiOiJqYWNvYkBkaXNjb3VudC5jb20ifSwiaWF0IjoxNjA1MzY0NTkyLCJleHAiOjE2MDU5NjkzOTJ9.pnLtiX8wnj6R8gtNO1erx9BAP9m5uzfNFVCOE4PaUak'
 
 
### Auth
###### description
will handle the authentication of a bank agency member
###### urls
* user login (will get the token that you will need to put in the headers value at the authrizations key)

       curl --location --request POST 'https://localhost:3000/auth/login' \
       --header 'Content-Type: application/json' \
       --data-raw '{
       "email": "jacob@discount.com",
       "password": "123!"
       }'
 
 
 *  user change password partial work 

        curl --location --request POST 'https://localhost:3000/auth/change_password' \
        --header 'authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiMjYzZWMwMzAtMjY4My0xMWViLTllNzQtOTUyYzFkOTJjZTgwIiwibmFtZSI6ImphY29iIiwiZW1haWwiOiJqYWNvYkBkaXNjb3VudC5jb20ifSwiaWF0IjoxNjA1MzY0NTkyLCJleHAiOjE2MDU5NjkzOTJ9.pnLtiX8wnj6R8gtNO1erx9BAP9m5uzfNFVCOE4PaUak' \
        --header 'Content-Type: application/json' \
        --data-raw '{
          "password":{ "newPassword" : "323234"}
        }'
        
        
### Customer
###### description
will represent a customer of a bank
###### urls
* get all customer

       curl --location --request GET 'https://localhost:3000/customer/all' \
       --header 'authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiMjYzZWMwMzAtMjY4My0xMWViLTllNzQtOTUyYzFkOTJjZTgwIiwibmFtZSI6ImphY29iIiwiZW1haWwiOiJqYWNvYkBkaXNjb3VudC5jb20ifSwiaWF0IjoxNjA1MzY0NTkyLCJleHAiOjE2MDU5NjkzOTJ9.pnLtiX8wnj6R8gtNO1erx9BAP9m5uzfNFVCOE4PaUak'
 
 
 * get one customer

        curl --location --request POST 'https://localhost:3000/auth/change_password' \
        --header 'authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiMjYzZWMwMzAtMjY4My0xMWViLTllNzQtOTUyYzFkOTJjZTgwIiwibmFtZSI6ImphY29iIiwiZW1haWwiOiJqYWNvYkBkaXNjb3VudC5jb20ifSwiaWF0IjoxNjA1MzY0NTkyLCJleHAiOjE2MDU5NjkzOTJ9.pnLtiX8wnj6R8gtNO1erx9BAP9m5uzfNFVCOE4PaUak' \
        --header 'Content-Type: application/json' \
        --data-raw '{
          "password":{ "newPassword" : "323234"}
        }