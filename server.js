const express = require('express');
const app = express();
var bcrypt = require('bcryptjs');
const cors = require('cors');
const knex = require('knex');
const { password } = require('pg/lib/defaults');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

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
app.post('/signin', signin.handleSignin(db, bcrypt))
    // ----------Registering--------------------

app.post('/register', register.handleRegister(db, bcrypt))
    // --------------Profile---------------------

app.get('/profile/:id', profile.handleProfile(db))
    // ---------------Image----------
app.put('/image', image.handleImage(db))
    // ------------------------
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) })



// ------------ Listening to port 8000-------
app.listen(8000, () => {
        console.log("this is runnning on port 8000 and is working with no errors... hopefully.")
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



/*

/ --> res = this is working
/signin --> POST = success/fail
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT = user

When sending data to the front-end using JSON, we need to remember to 
parse it cause express doesn't kmow what we sent over

*/