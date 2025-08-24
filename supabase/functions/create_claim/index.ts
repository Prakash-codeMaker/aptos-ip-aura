import { serve } from 'std/server';
import { createClient } from '@supabase/supabase-js';

// This is a Supabase Edge Function example. Set SUPABASE_URL and SUPABASE_SERVICE_KEY in env.
serve(async (req) => {
  try {
    const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
    const SUPABASE_SERVICE_KEY = Deno.env.get('SUPABASE_SERVICE_KEY');
    if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
      return new Response(JSON.stringify({ error: 'Server misconfigured' }), { status: 500 });
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

    const body = await req.json();
    const { title, description, price, owner, content_hash } = body;
    if (!title || !description || !content_hash) {
      return new Response(JSON.stringify({ error: 'Missing fields' }), { status: 400 });
    }

    // Check duplicate
    const { data: existing, error: checkErr } = await supabase
      .from('ip_claims')
      .select('id, title, owner, created_at')
      .eq('content_hash', content_hash)
      .limit(1);

    if (checkErr) {
      console.error('Supabase check error', checkErr);
      return new Response(JSON.stringify({ error: 'Database error' }), { status: 500 });
    }

    if (existing && existing.length > 0) {
      return new Response(JSON.stringify({ duplicate: existing[0] }), { status: 200 });
    }

    // Insert claim
    const { data, error: insertErr } = await supabase
      .from('ip_claims')
      .insert([{ title, description, price: price || 0, owner, content_hash }])
      .select()
      .single();

    if (insertErr) {
      console.error('Supabase insert error', insertErr);
      return new Response(JSON.stringify({ error: 'Insert failed' }), { status: 500 });
    }

    return new Response(JSON.stringify({ claim: data }), { status: 200 });

  } catch (err) {
    console.error('Handler error', err);
    return new Response(JSON.stringify({ error: 'Internal error' }), { status: 500 });
  }
});
