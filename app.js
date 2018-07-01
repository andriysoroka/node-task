const User = require('./Users')

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const list = [];



app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.post('/user', (req, res, next) => next(),
    (req, res) => {
        console.log('body: ', req.body)
        res.send('user created')

        const user = new User({
            name: req.body.name,
            age: req.body.age
        })

        list.push(user);

        console.log(list);

        // user.save().than(user => {
        //     res.send('user created!')
        // }).catch(err => {
        //     res.send(err);
        // })
    }
)

app.listen(3000);