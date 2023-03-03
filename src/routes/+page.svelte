<script>
  import { onMount } from 'svelte';
  import { supabase } from '$lib/supabaseClient';

  let todos = [];

  onMount(async () => {
    let { data, error } = await supabase.from('todos').select('*');
    todos = data;
    console.table(todos);
  });
</script>

{#each todos as todo}
  <div class="todos">
    <input type="checkbox" checked={todo.isComplete}>
    <input type="text" value={todo.task}>
    <button>Delete</button>
  </div>
{:else}
  <p>No todos found</p>
{/each}

<style>
  .todos {
    display: flex;
    margin-bottom: 0.25em;
  }
</style>
