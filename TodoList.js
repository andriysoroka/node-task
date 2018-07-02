var mongoose = require('mongoose');
const express = require('express')
const Todo = require('./Todo');
const app = express();
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


var mongoDB = 'mongodb://localhost/newtodolist';
mongoose.connect(mongoDB);


const someTodo = new Todo ({
    title: 'some 1',
    discription:' String 1',
})


app.get('/todo', (req, res, next) => next(),
    (req, res) => {
      Todo.find(function (err, todos) {
        if (err) {
            return next(new Error(err))
        }
        res.json(todos) // return all todos
        })
    }
)


app.post('/todo', (req, res, next) => next(),
    (req, res) => {
        console.log('body: ', req.body)
        // res.send('user created')
        const todo = new Todo({
            name: req.body.name,
            done: req.body.done
        })
        console.log(todo);
        Todo.create(todo,
            function (error, todo) {
                if (error) {
                    res.status(400).send('Unable to create todo list')
                }
                res.status(200).json(todo)
            }
        )
    }
)

app.put('/todo/:id', (req, res, next) => next(),
    (req, res) => {
        Todo.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
            if (err) return next(err);
            res.json(post);
          })
    }
)

app.delete('/todo/:id', (req, res, next) => next(),
    (req, res) => {
        var id = req.params.id
        console.log(id)
        Todo.findByIdAndRemove(id, function (err, todo) {
            if (err) {
                return next(new Error('Todo was not found'))
            }
            res.json('Successfully removed')
        })
  }
)

mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.listen(3000);

