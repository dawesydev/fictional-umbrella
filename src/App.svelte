<script>
import "./css/reset.css";
import "./css/style.css";

let todoId = 4;
let todoTitle = "";
let todos = [
    {
      id: 1,
      title: "Finish Svelte screencast",
      isComplete: false,
      isEditing: false,
    },
    {
      id: 2,
      title: "Go shopping",
      isComplete: true,
      isEditing: false,
    },
    {
      id: 3,
      title: "Take over world",
      isComplete: false,
      isEditing: false,
    },
  ];

const addTodo = () => {
  todos = [
    ...todos,
    {
      id: todoId,
      title: todoTitle,
      isComplete: false,
      isEditing: false,
    },
];

const deleteTodo = (id) => {
  todos = todos.filter((todo) => todo.id !== id);
}

todoTitle = "";
todoId++;

}

$: remainingTodos = todos.filter(todo => !todo.isComplete).length

const checkAllTodos = () => {
  todos = todos.map(todo => {
    todo.isComplete = true;
    return todo;
  })
}

const clearCompleted = () => {
  todos = todos.filter(todo => !todo.isComplete)
}
</script>

<main>
 <div class="todo-app-container">
  <div class="todo-app">
    <h2>Todo App</h2>
    <form action="#" on:submit|preventDefault={addTodo}>
      <input 
        type="text"
        class="todo-input"
        placeholder="What do you need todo?"
        bind:value={todoTitle}
      />
    </form>

    <ul class="todo-list">
      {#each todos as todo}
        <li class="todo-item-container">
          <div class="todo-item">
            <input type="checkbox" bind:checked={todo.isComplete}/>
            <span class="todo-item-label" class:line-through={todo.isComplete}>{todo.title}</span>
          </div>
          <button class="x-button">
            <svg
            class="x-button-icon"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </li>
      {/each}
    </ul>

    <div class="check-all-container">
      <div>
        <button on:click={checkAllTodos} class="button">Check All</button>
      </div>

      <span>{remainingTodos} items remaining</span>
    </div>

    <div class="other-buttons-container">
      <div>
        <button class="button filter-button filter-button-active">All</button>
        <button class="button filter-button">Active</button>
        <button class="button filter-button">Completed</button>
      </div>
      <div>
        <button on:click={clearCompleted} class="button filter-button filter-button-active">Clear completed</button>
      </div>
    </div>
  </div>
 </div>
</main>

<style>
  
</style>
