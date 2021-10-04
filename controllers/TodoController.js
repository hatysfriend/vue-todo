module.exports = {

    deleteTodo(id) {
        console.log("THE id is: " + id);
        fetch(`${port}/delete/${id}`, {
          method: "DELETE"
        })
          .then(() => (this.todos = this.todos.filter((todo) => todo.id != id)))
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
          console.log("seedData Res: " + JSON.stringify(res) );
          this.todos = res.result;
        })
        .catch((err) => console.log(err));
      },
      

}