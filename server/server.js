//Express
const express = require('express');
const app = express();
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//Endpoints 
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const user = require('./controllers/user');
const API_Clarifai = require('./controllers/API_Clarifai')

//dotenv
require('dotenv').config()
const PORT = process.env.PORT;

//CORS
var cors = require('cors')
app.use(cors())

//Bcrypt
const bcrypt = require('bcrypt');

//Knex
const knex = require('knex')({
    client: 'pg',
    connection: {
      host : process.env.DB_HOST,
      user : process.env.DB_USER,
      password : process.env.DB_PASSWORD,
      database : process.env.DB_NAME
    }
  });

app.post('/signin', (req, res) => signin.handlerSignIn(req, res, bcrypt, knex));

app.post('/register', (req, res) => register.handleRegister(req, res, bcrypt, knex));

app.get('/profile/:id', (req, res) => user.getUserProfile(req, res, knex));

app.put('/image', (req, res) => user.updateUserEntries(req, res, knex));

app.post('/imageurl', (req, res) => API_Clarifai.handleAPICall(req, res))

app.listen(PORT, () => console.log(`Server Running in port ${PORT}`));

