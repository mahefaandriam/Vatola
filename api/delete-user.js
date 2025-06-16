// api/delete-user.js
import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  if (req.method !== 'DELETE') return res.status(405).json({ error: 'Method not allowed' });

  const { user_id } = req.query;

  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  // Optional: delete profile
  await supabase.from('profiles').delete().eq('id', user_id);

  const { error } = await supabase.auth.admin.deleteUser(user_id);

  if (error) return res.status(500).json({ error: error.message });

  res.status(200).json({ success: true });
}
