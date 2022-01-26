const express = require('express');

const app = express();

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

// Testing
app.get('/', (req, res) => {
    res.send('This is working')
})

// Signing in -----------
app.post('/signin', (req, res) => {
    if (req.body.email === database.users[0].email &&
        req.body.password === database.users[0].password) {
        res.json('Success');
    } else {
        res.status(400).json('Error logging in,')
    }

})

// tessst



// Listening to port 3000
app.listen(3000, () => {
    console.log("this is runnning on port 3000")
})


/*

/ --> res = this is working
/signin --> POST = success/fail
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT = user

*/