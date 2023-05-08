<script>
    import './css/reset.css'
    import './css/style.css'
    import NoTodosContainer from './NoTodosContainer.svelte'
    import TodoFormMiddle from './TodoFormMiddle.svelte'
    import TodoList from './TodoList.svelte'
    import { todos } from './stores/TodosStore'
</script>

<div class="todo-app-container">
    <div class="todo-app">
        <h2>Todo App</h2>
        <TodoFormMiddle />

        {#if $todos.length > 0}
            <TodoList />
        {:else}
            <NoTodosContainer />
        {/if}
    </div>
</div>
