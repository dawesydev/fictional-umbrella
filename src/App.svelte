<script>
    // @ts-nocheck
    import { fade, fly } from 'svelte/transition'

    import './css/reset.css'
    import './css/style.css'

    let todoId = 4
    let todoTitle = ''
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

    const addTodo = () => {
        todos = [
            ...todos,
            {
                id: todoId,
                title: todoTitle,
                isComplete: false,
                isEditing: false,
            },
        ]
        todoTitle = ''
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
            <form action="#" on:submit|preventDefault={addTodo}>
                <input
                    type="text"
                    class="todo-input"
                    placeholder="What do you need todo?"
                    bind:value={todoTitle}
                />
            </form>

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
                <div
                    bind:this={noTodosContainer}
                    class="no-todos-container"
                    transition:fade
                    on:introstart={() =>
                        (noTodosContainer.style = 'display: none')}
                    on:introend={() =>
                        (noTodosContainer.style = 'display: block')}
                >
                    <div class="no-todos-svg-container">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width=".5"
                            stroke="currentColor"
                            class="w-6 h-6"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                            />
                        </svg>
                    </div>
                    <div class="no-todos-text-container">
                        Please enter a todo...
                    </div>
                </div>
            {/if}
        </div>
    </div>
</main>
