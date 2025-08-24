import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useWallet } from '@/hooks/useWallet';
import { hashStringSHA256 } from '@/lib/ip';
import { callCreateClaim } from '@/lib/api';

export const PurchaseAndClaim = () => {
  const { isConnected, account, isConnecting, connectWallet, signAndSubmitTransaction } = useWallet() as any;
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState<number | ''>('');
  const [loading, setLoading] = useState(false);
  const [duplicateInfo, setDuplicateInfo] = useState<any | null>(null);

  const handlePurchase = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      alert('Please provide both title and description.');
      return;
    }

    if (!isConnected) {
      await connectWallet();
    }

    setLoading(true);
    setDuplicateInfo(null);

    try {
      const contentToHash = `${title.trim()}|${description.trim()}`;
      const hash = await hashStringSHA256(contentToHash);

      // Call the serverless function to handle duplicate check and insert
      const payload = { title: title.trim(), description: description.trim(), price: Number(price) || 0, owner: isConnected ? account : null, content_hash: hash };

      const result = await callCreateClaim(payload);

      if (result.error) {
        throw new Error(result.error);
      }

      if (result.duplicate) {
        setDuplicateInfo(result.duplicate);
        alert(`Duplicate found: claimed by ${result.duplicate.owner} on ${new Date(result.duplicate.created_at).toLocaleString()}`);
        setLoading(false);
        return;
      }

      if (result.claim) {
        const claim = result.claim;

        // Optionally submit on-chain transaction
        if (window.aptos && signAndSubmitTransaction) {
          const txPayload = {
            type: 'entry_function_payload',
            function: '0x1::example::claim_ip',
            type_arguments: [],
            arguments: [claim.id, title.trim(), description.trim(), Number(price) || 0],
          };

          try {
            const txRes = await signAndSubmitTransaction(txPayload);
            console.log('On-chain tx result', txRes);
          } catch (txErr) {
            console.warn('On-chain tx failed, but claim saved in DB:', txErr);
          }
        }

        alert('IP claimed successfully. Reference ID: ' + claim.id);
        setTitle('');
        setDescription('');
        setPrice('');
      }

    } catch (err: any) {
      console.error('Purchase error', err);
      alert('Failed to submit claim. See console for details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="purchase-claim" className="py-24 bg-background text-foreground">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold">Purchase & Claim IP</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mt-2">Claim ownership of your intellectual property on the Aptos blockchain. Use a wallet (Petra) to sign and submit the claim transaction.</p>
        </div>

        <div className="glass rounded-2xl p-8 max-w-3xl mx-auto">
          <form onSubmit={handlePurchase} className="space-y-4">
            <Input value={title} onChange={e => setTitle(e.target.value)} placeholder="IP Title" className="bg-surface/50" />
            <Textarea value={description} onChange={e => setDescription(e.target.value)} rows={4} placeholder="Short description" className="bg-surface/50" />
            <Input value={price as any} onChange={e => setPrice(e.target.value === '' ? '' : Number(e.target.value))} type="number" placeholder="Price (APTOS)" className="bg-surface/50" />

            {duplicateInfo && (
              <div className="p-4 bg-destructive/10 text-destructive rounded">
                Duplicate detected: This IP appears to have been claimed already by {duplicateInfo.owner} on {new Date(duplicateInfo.created_at).toLocaleString()} (ID: {duplicateInfo.id})
              </div>
            )}

            <div className="flex items-center justify-between">
              <Button type="submit" className="btn-hero" disabled={loading || isConnecting}>
                {loading ? 'Processing...' : 'Purchase & Claim'}
              </Button>
              <div className="text-sm text-muted-foreground ml-4">
                {isConnected ? `Wallet: ${String(account).slice(0,6)}...` : 'Not connected'}
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default PurchaseAndClaim;
