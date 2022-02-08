const express = require('express');
const app = express();
var bcrypt = require('bcryptjs');
const cors = require('cors');
const knex = require('knex');
const { password } = require('pg/lib/defaults');

const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: 'Crumpet63',
        database: 'face-recognition-ai'
    }
});


app.use(express.json());
app.use(cors());


// Testing NOT USED---------------------
app.get('/', (req, res) => {
        res.send(database.users);
    })
    // -----------------------




// ------------- Signing in-----------
app.post('/signin', (req, res) => {
    db.select('email', 'hash').from('login')
        .where('email', '=', req.body.email)
        .then(data => {
            const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
            if (isValid) {
                return db.select('*').from('users')
                    .where('email', '=', req.body.email)
                    .then(user => {
                        res.json(user[0])
                    })
                    .catch(err => res.status(400).json('unable to get user'))
            } else {
                res.status(400).json('Wrong credentials')

            }
        })
        .catch(err => res.status(400).json('wrong credentials'))
})

// ----------Registering--------------------

app.post('/register', (req, res) => {
        const { name, email } = req.body
        const salt = bcrypt.genSaltSync(10);
        const password = req.body.password;
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
    })
    // --------------Profile---------------------

app.get('/profile/:id', (req, res) => {
        const { id } = req.params;
        db.select('*').from('users').where({ id })
            .then(user => {
                if (user.length) {
                    res.json(user[0])
                } else {
                    res.status(400).json('Not found')
                }
            })
            .catch(err => res.status(400).json('Error getting user'))
            // if (!found) {
            //     res.status(400).json("Not found..");
            // }
    })
    // ---------------Image----------
app.put('/image', (req, res) => {
        const { id } = req.body;
        db('users').where('id', '=', id)
            .increment('entries', 1)
            .returning('entries')
            .then(entries => {
                res.json(entries[0]);
            })
            .catch(err => res.status(400).json("can't get entries"))
            .then(count => {
                this.setState(Object.assign(this.state.user, count))
            })
    })
    // ------------------------

// bcrypt.hash(password, 8, function(err, hash) {
//     console.log(hash)
// });

// bcrypt.genSalt(10, function(err, salt) {
//     bcrypt.hash("B4c0/\/", salt, function(err, hash) {
//         // Store hash in your password DB.
//     });
// });

// // Load hash from your password DB.
// bcrypt.compare("B4c0/\/", hash, function(err, res) {
//     // res === true
// });
// bcrypt.compare("not_bacon", hash, function(err, res) {
//     // res === false
// });

// // As of bcryptjs 2.4.0, compare returns a promise if callback is omitted:
// bcrypt.compare("B4c0/\/", hash).then((res) => {
//     // res === true
// });



// ------------ Listening to port 8000-------
app.listen(8000, () => {
        console.log("this is runnning on port 8000 and is working with no errors... hopefully.")
    })
    // ------------------------

/*

/ --> res = this is working
/signin --> POST = success/fail
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT = user

When sending data to the front-end using JSON, we need to remember to 
parse it cause express doesn't kmow what we sent over

*/