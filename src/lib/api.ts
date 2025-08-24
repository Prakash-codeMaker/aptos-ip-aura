export const CREATE_CLAIM_URL = import.meta.env.VITE_CREATE_CLAIM_URL || '/api/create-claim';

export async function callCreateClaim(payload: any) {
  const res = await fetch(CREATE_CLAIM_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  return res.json();
}
