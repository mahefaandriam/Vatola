import { supabase } from '../src/lib/supabaseClient';

export async function getRooms() {
  const { data, error } = await supabase.from('rooms').select('*');
  if (error) throw error;
  return data;
}
