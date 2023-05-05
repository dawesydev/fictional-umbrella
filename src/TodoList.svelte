<script>
// @ts-nocheck

    import { fade, fly } from 'svelte/transition'
    import { createEventDispatcher } from 'svelte'

    const dispatch = createEventDispatcher()

    // define props using 'export'
    export let filteredTodos
    export let remainingTodos
    export let currentFilter

    function checkAllTodos() {
        dispatch('checkAllTodosDispatched')
    }
    function clearCompleted() {
        dispatch('clearCompletedDispatched')
    }
    function deleteTodo(id) {
        dispatch('deleteTodoDispatched', {
            id,
        })
    }
    function updateFilter(filter) {
        dispatch('updateFilterDispatched', {
            filter,
        })
    }

    function editTodo(todo) {
        dispatch('editTodo', {
            todo,
        })
    }
    function doneEdit(todo) {
        dispatch('doneEdit', {
            todo,
        })
    }
    function doneEditKeydown(event, todo) {
        dispatch('doneEditKeydown', {
            key: event.key,
            todo,
        })
    }
</script>

<div>
    <ul class="todo-list">
        {#each filteredTodos as todo (todo.id)}
            <li
                class="todo-item-container"
                in:fly={{ x: 100, duration: 400 }}
                out:fade={{ duration: 400 }}
            >
                <div class="todo-item">
                    <input type="checkbox" bind:checked={todo.isComplete} />
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
                            on:keydown={(event) => doneEditKeydown(event, todo)}
                        />
                    {/if}
                </div>
                <button class="x-button" on:click={deleteTodo(todo.id)}>
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
        <div>
            {#key remainingTodos}
                <span style="display: inline-block" in:fly={{ y: -20 }}
                    >{remainingTodos}</span
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
                on:click={() => updateFilter('all')}>All</button
            >
            <button
                class="button filter-button"
                class:filter-button-active={currentFilter === 'all'}
                on:click={() => updateFilter('active')}>Active</button
            >
            <button
                class="button filter-button"
                class:filter-button-active={currentFilter === 'all'}
                on:click={() => updateFilter('completed')}>Completed</button
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
</div>
