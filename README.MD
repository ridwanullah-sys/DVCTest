# INSTALLATION
Node version used = v20.11.0
package manager used = NPM V10.2.4

## Note:
copy the .env.example to .env file and then input the MONGO_URI connection string. You can also change the port

Install app by running
```
npm install
```



# START
Start the app by running 
```
npm start
```

# EXPOSED API ENDPOINTS

## Get /api
it gets all the users from the database
returns: Array of users

## Post /api
API Body:

```
  firstName: string; required; max=20; min=3
  lastName: string; required; max=20; min=3
  email: string; required; unique, valid email
  age: number;
```
return: One user Object

## Get /getById/:id
API Param: User default mongodb ID
```
```
return: One user Object

## Get /getByAge/:age
API Param: age
```
```
return: Array of users with the curresponding age passed in the param

# CLI Commands

## Create Model
```
npm run model:generate
``` 
It asks for the model name and then create the model in model folder and the json in the json folder

## Create Migration
```
npm run migrate
```

It generate empty collections into the mongoDB databse