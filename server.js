const express = require('express');
const app = express();


app.use(express.json());
const database = {
    users: [{
            id: '123',
            name: "John",
            email: "john@gmail.com",
            password: "hitman",
            entries: 0,
            joined: new Date()
        },
        {
            id: '1234',
            name: "Sally",
            email: "sally@gmail.com",
            password: "bananas",
            entries: 0,
            joined: new Date()
        }

    ]
}

// Testing ---------------------
app.get('/', (req, res) => {
        res.send('This is working')
    })
    // -----------------------




// ------------- Signing in-----------
app.post('/signin', (req, res) => {
        if (req.body.email === database.users[0].email &&
            req.body.password === database.users[0].password) {
            res.json('Success');
        } else {
            res.status(400).json('Error logging in,')
        }

    })
    // ----------Registering--------------------

app.post('/regisiter', (req, res) => {
    req.body

})



// -------------------------


// Listening to port 3000
app.listen(3000, () => {
        console.log("this is runnning on port 3000 and is working with no")
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