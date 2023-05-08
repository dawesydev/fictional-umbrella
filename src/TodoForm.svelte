<script>
    import { createEventDispatcher } from 'svelte'
    import { todos } from './stores/TodosStore'
    import TodoFormMiddle from './TodoFormMiddle.svelte'

    let todoId = 4
    let todoTitle = ''

    function addTodo() {
        todos.update((todos) => {
            return [
                ...todos,
                {
                    id: todoId,
                    title: todoTitle,
                    isComplete: false,
                    isEditing: false,
                },
            ]
        })
        todoTitle = ''
        todoId++
    }
</script>

<form action="#" on:submit|preventDefault={addTodo}>
    <input
        type="text"
        class="todo-input"
        placeholder="What do you need todo?"
        bind:value={todoTitle}
    />
</form>
