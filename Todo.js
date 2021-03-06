const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
    name: {
        type: String
    },
    
    done: {
        type: Boolean, default: false 
      }
    },
    
    {
    collection: 'todos'
    }
);

const Todo = mongoose.model('Todo', TodoSchema);
module.exports = Todo;