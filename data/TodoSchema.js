const mongoose = require("mongoose");

let todoSchema = new mongoose.Schema({
    title: {type: String, required: true},
    completed: {type: Boolean}
})


module.exports = mongoose.model("todo", todoSchema)
