import { writable } from 'svelte/store';
import { supabase } from '$lib/supabaseClient';


const { data } = await supabase.auth.getUser();

export const user = writable(data.user || false);
