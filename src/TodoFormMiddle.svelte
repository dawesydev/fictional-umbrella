<script>
    import TodoForm from './TodoForm.svelte'

    // on:todoAdded is equivalent to the code commented out below

    // import { createEventDispatcher } from "svelte";

    // const dispatch = createEventDispatcher();
    // function addTodo(event) {
    //     dispatch("todoAdded", {
    //         todoTitle: event.detail.todoTitle
    //     })
    // }
</script>

<TodoForm on:todoAdded />
