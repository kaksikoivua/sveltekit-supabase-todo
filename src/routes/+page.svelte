<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { supabase } from '$lib/supabaseClient';

  import { user } from '$lib/stores';
  import Todo from '$lib/Todo.svelte';

  let todos = [];
  let newTask = '';

  onMount(async () => {
    await getAllTodos();
  });

  const getAllTodos = async () => {
    try {
      let { data, error } = await supabase.from('todos').select('*');
      todos = data;
    } catch (err) {
      console.log(err);
    }
  };

  const addNewTodo = async () => {
    try {
      const { data, error } = await supabase
        .from('todos')
        .insert([{ task: newTask, user_id: $user.id }]);
      await getAllTodos();
      newTask = '';
    } catch (err) {
      console.log(err);
    }
  };

  const updateTodo = async (todo) => {
    try {
      const { data, error } = await supabase
        .from('todos')
        .update({ task: todo.task, isComplete: todo.isComplete })
        .eq('id', todo.id);
      await getAllTodos();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteTodo = async (todo) => {
    try {
      const { data, error } = await supabase
        .from('todos')
        .delete()
        .eq('id', todo.id);
      await getAllTodos();
    } catch (err) {
      console.log(err);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && newTask !== '') {
      addNewTodo();
    }
  };

  const signOut = async () => {
    let { error } = await supabase.auth.signOut();
    $user = false;
    goto('/signin');
  };
</script>

<h4>Welcome {$user?.email ? $user.email : ''}!</h4>

<div class="add-todo">
  <input type="text" bind:value={newTask}>
  <button on:click={() => addNewTodo()}>Add Task</button>
</div>

{#each todos as todo}
  <Todo {todo} {updateTodo} {deleteTodo}/>
{:else}
  <p>No todos found</p>
{/each}

{#if $user.email}
  <p on:click={signOut} class="switch">SignOut</p>
{/if}

<svelte:window on:keypress={handleKeyPress}></svelte:window>

<style>
  .add-todo {
    display: flex;
    margin-bottom: 0.5em;
  }
</style>
