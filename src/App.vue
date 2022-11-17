<template>
  <div class = "badass-todo">
    <div class="title has-text-centered">
      BadAss To Do
    </div>

    <form
      @submit.prevent="addTodo"
    >
      <div class="field is-grouped mb-5">
        <div class="control is-expanded">
          <input 
            v-model="newTodoContent"
            class="input" 
            type="text" 
            placeholder="Write a Task">
        </div>
        <div class="control">
          <button
            :disabled="!newTodoContent" 
            class="button is-info"
          >
            Add
          </button>
        </div>
      </div>
    </form>

    
</div>
<div 
v-for="todo in todos"
:key="todo.content"
class="card mb-5"
>
  <div class="card-content">
    <div class="content">
      <div class="columns is-mobile is-vcentered">
         <div class="column">
            {{ todo.content }}
         </div> 
         <div class="column is-5 has-text-right">
            <button class="button is-light">
              &check;
            </button>
            <button class="button is-danger ml-2">
              &cross;
          </button> 
         </div> 
      </div>

      
      
    </div>
  </div>
</div>   
</template>

<script setup>
/*
  imports
*/
  import { ref } from 'vue'
  import { v4 as uuidv4 } from 'uuid';
/*
  To Dos
*/

  const todos = ref([
    {
      id: 'id1',
      content: 'taks 1',
      done: false
    },
    {
      id: 'id2',
      content: 'taks 2',
      done: false
    }
  ])

/* 
    Add Todo
*/
    const newTodoContent = ref('')

    const addTodo = () => {
      const newTodo = {
        id: uuidv4(),
        content: newTodoContent.value,
        done: false
      }
      todos.value.unshift(newTodo)
      newTodoContent.value = ''
    }

</script>

<style>
@import'bulma\css\bulma.min.css';

.badass-todo{
  max-width: 400px;
  padding: 20px;
  margin: 0 auto;
}
</style>