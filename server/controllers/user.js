const getUserProfile = (req, res, knex) => {
    const {id} = req.params;
    knex.transaction(trx => {
        return trx.select('*').from('users').where({id:id})
        .then(user => {
            //User.length regresa true si la longitud es > 0 (AKA hay un usuario)
            (user.length) ? res.status(200).json(user[0]) : res.status(400).json('User_not_found')
        }).then(trx.commit)
        .catch(trx.rollback);
    }).catch(err => res.status(400).json('Unexpected_error'));
}

/**
 * Actualiza el contador de entradas del usuario en 1 cuando consulta una imagen
 * @param {request} req 
 * @param {response} res 
 * @param {db} knex 
 */
const updateUserEntries = (req, res, knex) => {
    const {id} = req.body;
    knex.transaction(trx => {
        return trx('users').returning('*').where({id:id}).increment('entries', 1)
        .then(trx.commit)
        .catch(trx.rollback);
    })
    .then(user => res.status(200).json(user[0]))
    .catch(err => res.status(400).json('No se registro tu intento :c'))
}

module.exports = {
    getUserProfile,
    updateUserEntries
}
