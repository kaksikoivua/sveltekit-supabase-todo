<script>
  import { goto } from '$app/navigation';
  import { supabase } from '$lib/supabaseClient';

  import { user } from '$lib/stores';

  let email = '';

  const signUp = async () => {
    let { data, error } = await supabase.auth.signUp({
      email: email,
      password: 'GXbwRDToUIQVqLfxLURy',
    });
    $user = data.user;
    goto('/');
  };

  const signIn = async () => {
    let { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: 'GXbwRDToUIQVqLfxLURy',
    });
    $user = data.user;
    goto('/');
  };
</script>

<label for="">
  Email:
  <input type="email" bind:value={email} placeholder="email@email.com">
</label>
<br>
<button on:click={signUp}>SignUp</button>
<button on:click={signIn}>SignIn</button>
