<script>
    import { onMount } from 'svelte'

    export let title = 'Default Counter'

    let count = 0
    let myText = ''

    const todos = [
        {
            id: 1,
            title: 'Finish Svelte Tutorial',
            isComplete: false,
        },
        {
            id: 2,
            title: 'Finish Go Tutorial',
            isComplete: false,
        },
        {
            id: 3,
            title: 'Finish SQL Tutorial',
            isComplete: false,
        },
    ]

    $: doubled = count * 2

    $: {
        console.log(`Multiple statements can be combined`)
        console.log(`the current count is ${count}`)
    }

    onMount(() => {
        console.log('Counter mounted')
    })

    const decrement = () => {
        count--
    }

    const increment = () => {
        count++
    }
</script>

<div>
    <h1>{title}</h1>
    <h2>count is {count} doubled is {doubled}</h2>
    {#if count > 10}
        count is high
        <!-- content here -->
    {:else if count > 5}
        count is in between
    {:else}
        count is low
    {/if}
    <button on:click={decrement}>Decrement</button>
    <button on:click={increment}>Increment</button>
</div>
<div>
    <form action="#">
        <input type="text" bind:value={myText} />
        <div>{myText}</div>
    </form>
</div>
<div>
    <h2>Each</h2>
    <ul>
        {#each todos as { id, title }, index (id)}
            <li>{index} {id}: {title}</li>
        {/each}
    </ul>
</div>
