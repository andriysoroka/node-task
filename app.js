const express = require('express')
const bodyParser = require('body-parser')
const app = express()


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.post('/user', (req, res, next) => next(),
    (req, res) => {
        console.log('body: ', req.body[0].name)
        res.send('user created')
    }
)

app.listen(3000);