const utils = require('./utils')

const handleRegister = (req, res, bcrypt, knex) => {
    const {name, email, password} = req.body;
    const SALTROUNDS = 10;

    const isValidName = validateName(name);
    const isValidEmail = utils.validateEmail(email);
    const isValidPassword = validatePassword(password);

    validateEmailIsDuplicated(email, knex).then(isEmailDuplicatad => {
        if (isValidName && isValidEmail && isValidPassword && !isEmailDuplicatad) {
            bcrypt.hash(password, SALTROUNDS, function(err, hash) {
                knex.transaction(trx => {
                    return trx('users')
                    .returning('*')
                    .insert({
                        name: name,
                        email:email,
                        hash: hash,
                        register_date: new Date()
                    }).then(trx.commit)
                    .catch(trx.rollback);
                })
                .then(user => res.status(200).json(user[0]))
                .catch(err => res.status(400).json('No se pudo completar el registro'))
            });
        }else{
            if(!isValidName)
                return res.status(400).json('name_error')
            if(!isValidEmail)
                return res.status(400).json('email_error');
            if(!isValidPassword)
                return res.status(400).json('password_error');
            if(isEmailDuplicatad)
                return res.status(400).json('duplicate_email_error');
        }  
    })
}

function validateEmailIsDuplicated(email, knex){
    return knex.select('email').from('users').where({email:email})
    .then(data => data[0].email === email)
    .catch(err => false);
}

function validatePassword(password){
    return password.length > 5
}

function validateName(name){
    return name.length > 1;
}

module.exports = {
    handleRegister : handleRegister,
}