import { useState, useEffect, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';

interface WalletState {
  isConnected: boolean;
  account: string | null;
  isConnecting: boolean;
  isInstalled: boolean;
}

declare global {
  interface Window {
    aptos?: {
      connect: () => Promise<{ address: string; publicKey: string }>;
      disconnect: () => Promise<void>;
      isConnected: () => Promise<boolean>;
      account: () => Promise<{ address: string; publicKey: string }>;
      network: () => Promise<{ name: string; chainId: string }>;
      signAndSubmitTransaction: (transaction: any) => Promise<any>;
      signMessage: (message: { message: string; nonce: string }) => Promise<any>;
    };
  }
}

export const useWallet = () => {
  const [walletState, setWalletState] = useState<WalletState>({
    isConnected: false,
    account: null,
    isConnecting: false,
    isInstalled: false,
  });

  const { toast } = useToast();

  // Check if Petra wallet is installed
  useEffect(() => {
    const checkWalletInstallation = () => {
      const isInstalled = typeof window !== 'undefined' && 'aptos' in window;
      setWalletState(prev => ({ ...prev, isInstalled: isInstalled }));
      
      if (isInstalled) {
        checkConnection();
      }
    };

    checkWalletInstallation();
    
    // Listen for wallet installation
    const handleWalletChange = () => {
      checkWalletInstallation();
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('aptos#initialized', handleWalletChange);
      return () => window.removeEventListener('aptos#initialized', handleWalletChange);
    }
  }, []);

  // Check if wallet is already connected
  const checkConnection = useCallback(async () => {
    if (!window.aptos) return;

    try {
      const isConnected = await window.aptos.isConnected();
      if (isConnected) {
        const account = await window.aptos.account();
        setWalletState(prev => ({
          ...prev,
          isConnected: true,
          account: account.address,
        }));
      }
    } catch (error) {
      console.error('Error checking wallet connection:', error);
    }
  }, []);

  // Connect wallet
  const connectWallet = useCallback(async () => {
    if (!window.aptos) {
      toast({
        title: "Petra Wallet Not Found",
        description: "Please install Petra wallet to continue. Visit petra.app",
        variant: "destructive",
      });
      return;
    }

    setWalletState(prev => ({ ...prev, isConnecting: true }));

    try {
      const response = await window.aptos.connect();
      
      setWalletState(prev => ({
        ...prev,
        isConnected: true,
        account: response.address,
        isConnecting: false,
      }));

      toast({
        title: "Wallet Connected",
        description: `Successfully connected to ${response.address.slice(0, 6)}...${response.address.slice(-4)}`,
      });

      // Store connection state
      localStorage.setItem('walletConnected', 'true');
      localStorage.setItem('walletAddress', response.address);

    } catch (error: any) {
      console.error('Wallet connection error:', error);
      
      setWalletState(prev => ({ ...prev, isConnecting: false }));
      
      if (error.code === 4001) {
        toast({
          title: "Connection Rejected",
          description: "Please approve the connection request to continue.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Connection Failed",
          description: "Failed to connect wallet. Please try again.",
          variant: "destructive",
        });
      }
    }
  }, [toast]);

  // Disconnect wallet
  const disconnectWallet = useCallback(async () => {
    if (!window.aptos) return;

    try {
      await window.aptos.disconnect();
      
      setWalletState(prev => ({
        ...prev,
        isConnected: false,
        account: null,
      }));

      // Clear stored state
      localStorage.removeItem('walletConnected');
      localStorage.removeItem('walletAddress');

      toast({
        title: "Wallet Disconnected",
        description: "Successfully disconnected from wallet.",
      });

    } catch (error) {
      console.error('Wallet disconnection error:', error);
      toast({
        title: "Disconnection Error",
        description: "Failed to disconnect wallet.",
        variant: "destructive",
      });
    }
  }, [toast]);

  // Sign and submit transaction
  const signAndSubmitTransaction = useCallback(async (transaction: any) => {
    if (!window.aptos || !walletState.isConnected) {
      throw new Error('Wallet not connected');
    }

    try {
      const response = await window.aptos.signAndSubmitTransaction(transaction);
      
      toast({
        title: "Transaction Submitted",
        description: `Transaction hash: ${response.hash.slice(0, 8)}...`,
      });

      return response;
    } catch (error: any) {
      console.error('Transaction error:', error);
      
      toast({
        title: "Transaction Failed",
        description: error.message || "Failed to submit transaction.",
        variant: "destructive",
      });
      
      throw error;
    }
  }, [walletState.isConnected, toast]);

  // Get network info
  const getNetwork = useCallback(async () => {
    if (!window.aptos) return null;

    try {
      const network = await window.aptos.network();
      return network;
    } catch (error) {
      console.error('Error getting network:', error);
      return null;
    }
  }, []);

  return {
    ...walletState,
    connectWallet,
    disconnectWallet,
    signAndSubmitTransaction,
    getNetwork,
  };
};