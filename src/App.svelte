<script>
    // @ts-nocheck
    import { fade, fly } from 'svelte/transition'
    import NoTodosContainer from './NoTodosContainer.svelte';
    import TodoFormMiddle from './TodoFormMiddle.svelte';

    import './css/reset.css'
    import './css/style.css'

    let todoId = 4
    let currentFilter = 'all'
    let todos = [
        {
            id: 1,
            title: 'Finish Svelte screencast',
            isComplete: false,
            isEditing: false,
        },
        {
            id: 2,
            title: 'Go shopping',
            isComplete: true,
            isEditing: false,
        },
        {
            id: 3,
            title: 'Take over world',
            isComplete: false,
            isEditing: false,
        },
    ]

    const addTodo = (event) => {
        todos = [
            ...todos,
            {
                id: todoId,
                title: event.detail.todoTitle,
                isComplete: false,
                isEditing: false,
            },
        ]
        todoId++
    }

    const deleteTodo = (id) => {
        todos = todos.filter((todo) => todo.id !== id)
    }

    const checkAllTodos = () => {
        todos = todos.map((todo) => {
            todo.isComplete = true
            return todo
        })
    }

    const clearCompleted = () => {
        todos = todos.filter((todo) => !todo.isComplete)
    }

    let beforeEditCache = ''

    const editTodo = (todo) => {
        beforeEditCache = todo.title
        todo.isEditing = true
        todos = todos
    }

    const doneEdit = (todo) => {
        if (todo.title.trim().length === 0) {
            todo.title = beforeEditCache
        }

        todo.isEditing = false
        todos = todos
    }

    const doneEditKeydown = (event, todo) => {
        if (event.key === 'Enter') {
            doneEdit(todo)
        }

        if (event.key === 'Escape') {
            todo.title = beforeEditCache
            doneEdit(todo)
        }
    }

    $: remainingTodos = todos.filter((todo) => !todo.isComplete).length
    $: filteredTodos =
        currentFilter === 'all'
            ? todos
            : currentFilter === 'active'
            ? todos.filter((todo) => !todo.isComplete)
            : todos.filter((todo) => todo.isComplete)

    let noTodosContainer
</script>

<main>
    <div class="todo-app-container">
        <div class="todo-app">
            <h2>Todo App</h2>
            <TodoFormMiddle on:todoAdded={addTodo}/>

            {#if todos.length > 0}
                <!-- content here -->
                <ul class="todo-list">
                    {#each filteredTodos as todo (todo.id)}
                        <li
                            class="todo-item-container"
                            in:fly={{ x: 100, duration: 2000 }}
                            out:fade={{ duration: 1000 }}
                        >
                            <div class="todo-item">
                                <input
                                    type="checkbox"
                                    bind:checked={todo.isComplete}
                                />
                                {#if !todo.isEditing}
                                    <!-- content here -->
                                    <span
                                        on:dblclick={editTodo(todo)}
                                        class="todo-item-label"
                                        class:line-through={todo.isComplete}
                                        >{todo.title}</span
                                    >
                                {:else}
                                    <!-- else content here -->

                                    <input
                                        type="text"
                                        class="todo-item-input"
                                        bind:value={todo.title}
                                        on:blur={doneEdit(todo)}
                                        autofocus
                                        on:keydown={(event) =>
                                            doneEditKeydown(event, todo)}
                                    />
                                {/if}
                            </div>
                            <button
                                class="x-button"
                                on:click={deleteTodo(todo.id)}
                            >
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
                        <button on:click={checkAllTodos} class="button"
                            >Check All</button
                        >
                    </div>
                    <div>
                        {#key remainingTodos}
                            <span
                                style="display: inline-block"
                                in:fly={{ y: -20 }}>{remainingTodos}</span
                            >
                        {/key}
                        <span>items remaining</span>
                    </div>
                </div>

                <div class="other-buttons-container">
                    <div>
                        <button
                            class="button filter-button"
                            class:filter-button-active={currentFilter === 'all'}
                            on:click={() => (currentFilter = 'all')}>All</button
                        >
                        <button
                            class="button filter-button"
                            class:filter-button-active={currentFilter === 'all'}
                            on:click={() => (currentFilter = 'active')}
                            >Active</button
                        >
                        <button
                            class="button filter-button"
                            class:filter-button-active={currentFilter === 'all'}
                            on:click={() => (currentFilter = 'completed')}
                            >Completed</button
                        >
                    </div>
                    <div>
                        <button
                            on:click={clearCompleted}
                            class="button filter-button filter-button-active"
                            >Clear completed</button
                        >
                    </div>
                </div>
            {:else}
                <!-- else content here -->
                <NoTodosContainer />
            {/if}
        </div>
    </div>
</main>
