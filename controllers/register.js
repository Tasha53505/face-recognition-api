const handleRegister = (db, bcrypt) => (req, res) => {
    const { name, email, password } = req.body
        // If breaks, try remove const password destructuring
    if (!email || !name || !password) {
        return res.status(400).json('Incorrect form submission')
    }
    const salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);
    db.transaction(trx => {
        trx.insert({
                hash: hash,
                email: email,
            })
            .into('login')
            .returning('email')
            .then(loginEmail => {
                return trx('users')
                    .returning('*')
                    .insert({
                        email: loginEmail[0].email,
                        name: name,
                        joined: new Date(),
                    })
                    // This grabs the last user.
                    .then(user => {
                        res.json(user[0])
                    })
                    .then(trx.commit)
                    .catch(trx.rollback)
            })
    })

    // Adds a catch and error block
    .catch(err => res.status(400).json("Unable to Register. Username or Email already in use."))
        // database.users[database.users.length - 1
}

module.exports = {
    handleRegister: handleRegister
}