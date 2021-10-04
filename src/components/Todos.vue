<template>
    <div>
        <div v-bind:key="todo.id" v-for="todo in todos">
            <todoItem v-bind:todo="todo" @del-todo="catchTheId"/>
        </div>
    </div>    
</template>

<script>
import todoItem from './TodoItem';

export default {
    name: "Todos",
    components: {
        todoItem
    },
    props: ["todos"],
    methods: {
        catchTheId(id) {
            this.$emit('del-todo', id);
        }
    }
}
</script>

<style scoped>

</style>

