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
:class="{'has-background-success-light' : todo.done}"
>
  <div class="card-content">
    <div class="content">
      <div class="columns is-mobile is-vcentered">
         <div class="column"
          :class="{'has-text-success line-through' : todo.done}"
         >
            {{ todo.content }}
         </div> 
         <div class="column is-5 has-text-right">
            <button 
            @click="toggleDone(todo.id)"
              class="button"
              :class="todo.done ? 'is-success' : 'is-light'"
              >
              &check;
            </button>
            <button 
            @click="deleteTodo(todo.id)"
            class="button is-danger ml-2">
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
  import { ref, onMounted } from 'vue'
  import { v4 as uuidv4 } from 'uuid';
  import { collection, onSnapshot } from "firebase/firestore";
  import { db } from '@/firebase'
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
      done: true
    }
  ])

/* 
    get Todos
*/
    onMounted(() => {
      // const querySnapshot = await getDocs(collection(db, "todos"));
      // let fbTodos = []
      // querySnapshot.forEach((doc) => {
      //   console.log(doc.id, " => ", doc.data());
      //   const todo = {
      //     id: doc.id,
      //     content: doc.data().content,
      //     done: doc.data().done
      //   }
      //   fbTodos.push(todo)  
      // });
      // todos.value = fbTodos 
      onSnapshot(collection(db, "todos"), (querySnapshot) => {
          const fbTodos = [];
          querySnapshot.forEach((doc) => {
            const todo = {
              id: doc.id,
              content: doc.data().content,
              done: doc.data().done
            }
            fbTodos.push(todo)
          });
          todos.value = fbTodos
        })
    })
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
/*
    delete Todo
*/
const deleteTodo = id => {
  todos.value = todos.value.filter(todo => todo.id !== id)
}

/* 
  toggle done
*/

const toggleDone = id => {
    const index = todos.value.findIndex(todo => todo.id === id)
    todos.value[index].done = !todos.value[index].done
  }

</script>

<style>
@import'bulma\css\bulma.min.css';

.badass-todo{
  max-width: 400px;
  padding: 20px;
  margin: 0 auto;
}

.line-through{
  text-decoration: line-through;
}
</style>