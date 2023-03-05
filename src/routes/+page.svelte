<script>
  import { onMount } from 'svelte';
  import { supabase } from '$lib/supabaseClient';

  import Todo from '$lib/Todo.svelte';

  let todos = [];

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
</script>

{#each todos as todo}
  <Todo {todo} {updateTodo} {deleteTodo}/>
{:else}
  <p>No todos found</p>
{/each}
