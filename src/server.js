const express = require('express');
const app = express();
const TodoRepository = require('../data/TodoRepository')
const cors = require('cors');
const seedData = require('../seedData.json');
const { collection } = require('../data/TodoSchema');

//Middleware
app.use(express.json());
app.use(cors());//CRoss-origin R S settings

app.get('/', (req, res) => {
    res.send("HELLO");
});

app.get('/getTodos', async (req, res) => {
    let result = await TodoRepository.GetAllTodos();
    res.status(200).send({result, message:"Retrieve Data"});
});

app.post('/addTodo', async (req, res) => {
    console.log(JSON.stringify(req.body));
    let result = await TodoRepository.InsertSingleTodo(req.body);
    res.status(201).send({result, message:"Successfully Added Todo"});
} )

app.get('/seedData', async (req, res) => {
    let collectionSoze = await TodoRepository.GetAllTodos();
    if(collectionSoze.length > 0) {
        await TodoRepository.DeleteCollection();
    }
    await TodoRepository.InsertTodoCollection(seedData);
    let result = await TodoRepository.GetAllTodos();
    res.status(200).send({result, message:"Successfully Seeded Data"});
})

app.delete('/delete/:id', async (req, res) => {
    let id = req.params.id;
    let result = await TodoRepository.DeleteSingleTodo(id);
    res.status(204).send({message:"No Content"});
})

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port: ${port}`));