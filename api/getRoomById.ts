import { supabase } from '../src/lib/supabaseClient';

export async function getRoomById(id: number) {
  const { data, error } = await supabase
    .from('rooms')
    .select('*')
    .eq('id', id)
    .single();
  if (error) throw error;
  return data;
}