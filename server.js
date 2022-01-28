const express = require('express');
const app = express();
var bcrypt = require('bcryptjs');
const cors = require('cors')


app.use(express.json());
app.use(cors());
const database = {
    users: [{
            id: '123',
            name: "John",
            password: "cookies",
            email: "john@gmail.com",
            entries: 0,
            joined: new Date()
        },
        {
            id: '',
            name: "",
            password: "",
            email: "",
            entries: 0,
            joined: ''
        }

    ],
    login: [{
        id: '987',
        hash: '',
        email: "john@gmail.com"
    }]
}

// Testing ---------------------
app.get('/', (req, res) => {
        res.send(database.users);
    })
    // -----------------------




// ------------- Signing in-----------
app.post('/signin', (req, res) => {

        if (req.body.email === database.users[0].email &&
            req.body.password === database.users[0].password) {
            res.json('Success');
        } else {
            res.status(400).json('Error logging in')
        }
    })
    // Test
    // ----------Registering--------------------

app.post('/register', (req, res) => {
        database.users.push({
                id: '125',
                name: name,
                email: email,
                password: password,
                entries: 0,
                joined: new Date()
            })
            // This grabs the last user.
        res.json(database.users[database.users.length - 1])
    })
    // --------------Profile---------------------

app.get('/profile/:id', (req, res) => {
        const { id } = req.params;
        let found = false;
        database.users.forEach(user => {
            if (user.id === id) {
                found = true;
                return res.json(user);
            }
        })
        if (!found) {
            res.status(400).json("Not found..");
        }
    })
    // ---------------Image----------
app.put('/image', (req, res) => {
        const { id } = req.body;
        let found = false;
        database.users.forEach(user => {
            if (user.id === id) {
                found = true;
                user.entries++
                    return res.json(user.entries);
            }
        })
        if (!found) {
            res.status(400).json("Not found..");
        }
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