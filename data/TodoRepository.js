module.exports = (() => {
    const TodoModel = require("./TodoSchema");
    const database = require("./database");
    
    database.GetDbInstance();
    
    async function _insertTodoCollection(seedData) {
      await TodoModel.insertMany(seedData);
    }
  
    async function _insertSingleTodo(todo) {
      let todoModel = new TodoModel(todo);
      return await todoModel.save();
    }

    async function _getAllTodos() {
      return await TodoModel.find();
    }
  
    async function _deleteSingleTodo(id) {
      return await TodoModel.findByIdAndDelete(id);
    }
  
    async function _getTodoByID(id) {
      return await TodoModel.findById(id);
    }

    async function _deleteCollection() {
        return await TodoModel.collection.drop();
      }
  
    async function _updateTodo(query) {
      return await TodoModel.findByIdAndUpdate(query.id, {$set: query.updateObject}, {upsert: false, new: true}, null);
    }
  
    return {
        InsertTodoCollection(todo) {
        return _insertTodoCollection(todo);
      },
        InsertSingleTodo(todo) {
        return _insertSingleTodo(todo);
      },
      GetAllTodos() {
        return _getAllTodos();
      },
      DeleteSingleTodo(id) {
        return _deleteSingleTodo(id);
      },
      GetTodoByID(id) {
        return _getTodoByID(id);
      },
      UpdateTodo(todo) {
        return _updateTodo(todo);
      },
      DeleteCollection() {
          return _deleteCollection();
      }
    };
  })();
  
  
  
  
  