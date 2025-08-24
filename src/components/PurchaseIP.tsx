import React from 'react';

export const PurchaseIP = () => {
  return (
    <section id="purchase-ip" className="py-10 bg-background text-foreground">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-4">Purchase IP & License Documents</h2>
        <p className="mb-6 text-muted-foreground">Secure your intellectual property rights and licensing with our streamlined process. Use our API to process transactions securely on the Aptos blockchain.</p>
        <form className="bg-surface/50 shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-muted-foreground text-sm font-bold mb-2">Email</label>
            <input type="email" placeholder="Your email" className="shadow appearance-none border rounded w-full py-2 px-3 text-foreground bg-surface/60" />
          </div>
          <div className="mb-4">
            <label className="block text-muted-foreground text-sm font-bold mb-2">IP Title</label>
            <input type="text" placeholder="Document title" className="shadow appearance-none border rounded w-full py-2 px-3 text-foreground bg-surface/60" />
          </div>
          <div className="mb-4">
            <label className="block text-muted-foreground text-sm font-bold mb-2">Price</label>
            <input type="number" placeholder="Price in APTOS" className="shadow appearance-none border rounded w-full py-2 px-3 text-foreground bg-surface/60" />
          </div>
          <div className="flex items-center justify-between">
            <button type="submit" className="bg-primary hover:bg-brand-light text-primary-foreground font-bold py-2 px-4 rounded">Purchase</button>
          </div>
        </form>
      </div>
    </section>
  );
};
