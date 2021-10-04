<template>
    <div class="todo-item" v-bind:class="{'is-completed':todo.completed}">   
        <p>
            <input type="checkbox" v-on:change="markComplete">
            {{todo.title}}
            <button @click="deleteTodo" class="del">x</button>
        </p>
    </div>
</template>

<script>
export default {
    name: "TodoItem",
    props: ["todo"],
    methods: {
        markComplete() {
            this.todo.completed = !this.todo.completed;
        },
        deleteTodo() {
            this.$emit('del-todo', this.todo._id);
        }

    },
    

}
</script>

<style scoped>
    .todo-item {
        background: whitesmoke;
        padding: 10px;
        border-bottom: 1px #ccc dotted;
    }

    .is-completed {
        text-decoration: line-through;
    }

    .del {
        background: tomato;
        color:aliceblue;
        border: none;
        padding: 5px 9px;
        border-radius: 50%;
        cursor: pointer;
        float: right;
    }

</style>