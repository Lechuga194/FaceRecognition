const express = require('express')
const app = express();
const PORT = 3000;

//CORS
var cors = require('cors')
app.use(cors())

//Bcrypt
const bcrypt = require('bcrypt');
const SALTROUNDS = 10;

const database = {
    users : [
        {
            id: '1',
            name: 'a',
            email: 'a',
            password: 'a',
            entries: 0,
            register_date: new Date()
        }
    ]
}

app.use(express.urlencoded({extended: false}));
app.use(express.json());
/*
TODO
* ---All Routes---
* Signin  --> POST succ/fail
* Resiter --> POST = user
* Profile/:userID --> GET = user
* /image --> PUT = user count ++
*/

//app.use()

app.get('/', (req, res) => {
    res.send(database.users);
})

app.post('/signin', (req, res) => {
    if(req.body.email === database.users[0].email && req.body.password === database.users[0].password)
        res.json(database.users[0]);
    else
        res.status(400).json("Error");
})

app.post('/register', (req, res) => {

    const {name, email, password} = req.body;
    
    bcrypt.hash(password, SALTROUNDS, function(err, hash) {
        newUser = {
            id: '2',
            name: name,
            email: email, 
            password: hash,
            entries: 0,
            register_date: new Date()
        }
        database.users.push(newUser);
    });

    return res.status(200).json(database.users[database.users.length - 1]);
})

app.get('/profile/:id', (req, res) => {
    database.users.forEach(user => {
        if(user.id == req.params.id)
            res.status(200).json(user);
    })
    res.status(300).json("ERROR");
})

app.put('/image', (req, res) => {
    database.users.forEach(user => {
        if(user.id == req.body.id){
            user.entries++;
            res.status(200).json(user);
            console.log('Server response: ', user)
        }
    })
})

app.listen(PORT, () => console.log(`Server Running in port ${PORT}`));

