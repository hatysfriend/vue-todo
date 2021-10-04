<template>
  <div id="Home">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <Todos v-bind:todos="todos" @del-todo="deleteTodo" />
    <AddTodo v-on:add-todo="addTodo" />
    <button v-on:click="seedData()">Seed Data</button>
  </div>
</template>

<script>
import Todos from "../components/Todos";
import AddTodo from "../components/AddTodo";
let port = "http://localhost:5000"

export default {
  name: "Home",
  components: {
    Todos,
    AddTodo,
  },
  data() {
    return {
      todos: [],
    };
  },
  methods: {
    getAllTodos() {
      fetch(`${port}/getTodos`)
      .then((response) => response.json())
      .then((res) => this.todos = res.result )
      .catch((err) => console.log("Delete ERROR: " + err));
    },

    deleteTodo(id) {
      console.log("THE id is: " + id);
      fetch(`${port}/delete/${id}`, {
        method: "DELETE"
      })
        .then(() => this.getAllTodos())
        .catch((err) => console.log("Delete ERROR: " + err));
    },

    addTodo(newTodo) {
      fetch(`${port}/addTodo`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newTodo.title,
          completed: newTodo.completed,
        }),
      })
      .then((res) => {
        res.json()
        .then((data) => {
          console.log(`Returned Object ${JSON.stringify(data.result)}`);
          this.todos = [...this.todos, data.result];
        });
      })
      .catch((err) => {
        console.log("POST FETCH ERROR " + err);
      });
    },
    
    seedData() {
      fetch(`${port}/seedData`)
      .then((response) => response.json())
      .then((res) => {
        this.todos = res.result;
      })
      .catch((err) => console.log(err));
    }
    
  },
  //created is a vue function which executes when component loads
  created() {
    
  }
};
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: Arial, Helvetica, Arial, sans-serif;
  line-height: 1.4;
}
</style>

  
