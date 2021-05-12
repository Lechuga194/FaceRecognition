const utils = require('./utils')

const handlerSignIn = (req, res, bcrypt, knex) => {
    
    const {email, password} = req.body;
    
    if(utils.validateEmail(email)){
        knex.transaction(trx => {
            return trx.select('*').from('users').where({email:email})
            .then(user => {
                const hash = user[0].hash
                bcrypt.compare(password, hash, function(err, result) {
                    (result) ? res.status(200).json(user[0]) : res.status(400).json('Credenciales invalidas');
                });
            }).then(trx.commit)
            .catch(trx.rollback);
        })
        .catch(err => res.status(400).json("Ocurrio un erro inesperado"));
    }else
        return res.status(400).json('email_error');
}

const wakeDB = (knex) => {
    knex.select('name').from('users').where({email:'dummy@gmail.com'})
}

module.exports = {
    handlerSignIn : handlerSignIn,
    wakeDB: wakeDB
}