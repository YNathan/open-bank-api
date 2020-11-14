![alt text](https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTPLoqEqtL8tOM9PTZJuavwSCVoGlsIauBsHA&usqp=CAU)

# instructions
* first create a user
* second login
* on login success you recive a token 
* put the token as value in the headers at authorization key
* start manipulate customer data

#### Technologies
* 'inversify' server for the api
* typeorm for the entity
* db is as json
* The connection is secured with free\self-signed certificate you can see it at app.ts
* The server is validate the client's JWT so every requests will be with a authorization token in the header



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
 
        curl --location --request GET 'https://localhost:3000/customer/one/Israeli-222210023' \
        --header 'authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiMjYzZWMwMzAtMjY4My0xMWViLTllNzQtOTUyYzFkOTJjZTgwIiwibmFtZSI6ImphY29iIiwiZW1haWwiOiJqYWNvYkBkaXNjb3VudC5jb20ifSwiaWF0IjoxNjA1MzY0NTkyLCJleHAiOjE2MDU5NjkzOTJ9.pnLtiX8wnj6R8gtNO1erx9BAP9m5uzfNFVCOE4PaUak'
* create a new customer 
 
        curl --location --request POST 'https://localhost:3000/customer/create' \
        --header 'authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiMjYzZWMwMzAtMjY4My0xMWViLTllNzQtOTUyYzFkOTJjZTgwIiwibmFtZSI6ImphY29iIiwiZW1haWwiOiJqYWNvYkBkaXNjb3VudC5jb20ifSwiaWF0IjoxNjA1MzY0NTkyLCJleHAiOjE2MDU5NjkzOTJ9.pnLtiX8wnj6R8gtNO1erx9BAP9m5uzfNFVCOE4PaUak' \
        --header 'Content-Type: application/json' \
        --data-raw '
          {
        "clientBank": "Discount",
        "clientID": "AI_JacobFintech-AI_TestFintech_U1",
        "consentID": "000000341",
        "customerID": "Yaacov-222210023",
        "customerPassport": "",
        "consentTrack": "BankOffered",
        "consentStatus": "valid",
        "activationStatus": "Activated",
        "customerSite": "Retail",
        "consentReusability": "Recurring",
        "acceptedDate": "2020-09-30",
        "confirmationTimestamp": "2020-09-30T11:04:53",
        "validFrom": "2020-09-30",
        "validUntil": "2020-12-31",
        "modificationTimestamp": "2020-09-30T11:04:03",
        "cancellationTimestamp": "0001-01-01T00:00:00",
        "cancellationReason": "",
        "cancellationInitiator": "",
        "frequencyPerDay": 1,
        "accountPermissions": [
          {
            "scope": "balances",
            "accountNumberIBAN": "IL540110920000153498542",
            "openingBranch": "0002",
            "accountNumber": "0153498732",
            "productCode": "CACC",
            "currencyCode": "",
            "accountStatus": "Active",
            "managingBranch": "0092"
          },
          {
            "scope": "transactions",
            "accountNumberIBAN": "IL54011092000015542732",
            "openingBranch": "0092",
            "accountNumber": "0153498732",
            "productCode": "CACC",
            "currencyCode": "",
            "accountStatus": "Terminated",
            "managingBranch": "0092"
          }
        ] }
        '


* update customer accountPermission.permissionStatus  

       curl --location --request POST 'https://localhost:3000/customer/update' \
       --header 'authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiMjYzZWMwMzAtMjY4My0xMWViLTllNzQtOTUyYzFkOTJjZTgwIiwibmFtZSI6ImphY29iIiwiZW1haWwiOiJqYWNvYkBkaXNjb3VudC5jb20ifSwiaWF0IjoxNjA1MzY0NTkyLCJleHAiOjE2MDU5NjkzOTJ9.pnLtiX8wnj6R8gtNO1erx9BAP9m5uzfNFVCOE4PaUak' \
       --header 'Content-Type: application/json' \
       --data-raw '
        {
            "clientBank": "Discount",
            "clientID": "updated_client_id_Fintech_U1",
            "consentID": "000000341",
            "customerID": "Yaacov-222210023",
            "customerPassport": "",
            "consentTrack": "BankOffered",
            "consentStatus": "valid",
            "activationStatus": "Activated",
            "customerSite": "Retail",
            "consentReusability": "Recurring",
            "acceptedDate": "2020-09-30",
            "confirmationTimestamp": "2020-09-30T11:04:53",
            "validFrom": "2020-09-30",
            "validUntil": "2020-12-31",
            "modificationTimestamp": "2020-09-30T11:04:03",
            "cancellationTimestamp": "0001-01-01T00:00:00",
            "cancellationReason": "",
            "cancellationInitiator": "",
            "frequencyPerDay": 1,
            "accountPermissions": [
                {
                  "scope": "balances",
                  "accountNumberIBAN": "IL540110920000153498542",
                  "openingBranch": "63656653554156",
                  "accountNumber": "0153498732",
                  "productCode": "CACC",
                  "currencyCode": "",
                  "accountStatus": "Active",
                  "managingBranch": "0092"
                }]
        }
       '


* delete customer 
 
        curl --location --request DELETE 'https://localhost:3000/customer/Yaacov-222210023' \
        --header 'authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiMjYzZWMwMzAtMjY4My0xMWViLTllNzQtOTUyYzFkOTJjZTgwIiwibmFtZSI6ImphY29iIiwiZW1haWwiOiJqYWNvYkBkaXNjb3VudC5jb20ifSwiaWF0IjoxNjA1MzY0NTkyLCJleHAiOjE2MDU5NjkzOTJ9.pnLtiX8wnj6R8gtNO1erx9BAP9m5uzfNFVCOE4PaUak'

###### **  I Added a swagger 
you can see it at url `https://localhost:3000/api-docs/swagger`
