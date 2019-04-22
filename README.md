
# NodePop

[Demo](/anuncios) of the methods (this link works only if you run the project)

Api for the iOS/Android apps.

Fully translated to EN and ES.

## Deploy

### Install dependencies
    
    npm install

### Configure  

Review lib/connectMongoose.js to set database configuration

### Init database

    npm run installDB

## Start

To start a single instance:
    
    npm start

To start in development mode:

    npm run dev (including nodemon & debug log)
  
To start microservice to create thumbnail:

    npm run startThumbnailCreator

## Test

    npm run teste2e 
To run end to end test.

## JSHint & JSCS

    npm run hints

## API v1 info - Advertisemnts

### Base Path

The API can be used with the path:
[/apiv1/anuncios](/apiv1/anuncios)
But login is required, is possible to login with api:
[/apiv1/login](/apiv1/login)

### Error example

    {
      "ok": false,
      "error": {
        "code": 401,
        "message": "This is the error message."
      }
    }

### POST /login

**Input Query**

    {
      email: user@example.com,
      password: 1234
    }

**Result**

    {
      "sucess": true,
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Y2EzZGJjZWY5YzgxZDFmYzRlNTJjOWIiLCJpYXQiOjE1NTU3NDA3OTcsImV4cCI6MTU1NTkxMzU5N30.r-U2oJ1_lsYE5uUOdlJX8-XHeWfdotLJ9J1L2ECA98E"
  }


### GET /anuncios

**Requirements**
A token must be sent along the query to autenticate.

**Input Query**:

start: {int} skip records<br>
limit: {int} limit to records<br>
sort: {string} field name to sort by<br>
includeTotal: {bool} whether to include the count of total records without filters<br>
tag: {string} tag name to filter<br>
venta: {bool} filter by venta or not<br>
precio: {range} filter by price range, examples 10-90, -90, 10-<br>
nombre: {string} filter names beginning with the string

Input query example: 
```
?start=0&limit=2&sort=precio&includeTotal=true&tag=mobile&venta=true&precio=-90&nombre=bi
```

**Result:** 

    {
      "ok": true,
      "result": {
        "rows": [
          {
            "_id": "55fd9abda8cd1d9a240c8230",
            "nombre": "iPhone 3GS",
            "venta": false,
            "precio": 50,
            "foto": "/images/anuncios/iphone.png",
            "__v": 0,
            "tags": [
              "lifestyle",
              "mobile"
            ]
          }
        ],
        "total": 1
      }
    }


### GET /anuncios/tags

Return the list of available tags for the resource anuncios.

**Result:** 

    {
      "ok": true,
      "allowed_tags": [
        "work",
        "lifestyle",
        "motor",
        "mobile"
      ]
    }
