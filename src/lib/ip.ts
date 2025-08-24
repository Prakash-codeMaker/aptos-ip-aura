import { supabase } from '@/integrations/supabase/client';

export async function hashStringSHA256(input: string) {
  // browser crypto
  const encoder = new TextEncoder();
  const data = encoder.encode(input);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export async function checkDuplicate(hash: string) {
  const sb = supabase as any;
  const { data, error } = await sb
    .from('ip_claims')
    .select('id, title, owner, created_at')
    .eq('content_hash', hash)
    .limit(1);

  if (error) throw error;
  return data && data.length > 0 ? data[0] : null;
}

export async function createClaim(payload: { title: string; description: string; price: number; owner: string | null; content_hash: string }) {
  const sb = supabase as any;
  const { data, error } = await sb
    .from('ip_claims')
    .insert([{ title: payload.title, description: payload.description, price: payload.price, owner: payload.owner, content_hash: payload.content_hash }])
    .select()
    .single();

  if (error) throw error;
  return data;
}
