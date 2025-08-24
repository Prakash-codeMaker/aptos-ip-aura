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

  // Check if Petra wallet is installed
  useEffect(() => {
    const checkWalletInstallation = () => {
      const isInstalled = typeof window !== 'undefined' &&
        'aptos' in window &&
        window.aptos !== undefined;

      setWalletState(prev => ({ ...prev, isInstalled: isInstalled }));

      if (isInstalled) {
        // Add a small delay to ensure wallet is fully initialized
        setTimeout(() => {
          checkConnection();
        }, 100);
      }
    };

    // Check immediately
    checkWalletInstallation();

    // Listen for wallet installation
    const handleWalletChange = () => {
      checkWalletInstallation();
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('aptos#initialized', handleWalletChange);
      // Also listen for load event in case wallet loads after page
      window.addEventListener('load', handleWalletChange);

      return () => {
        window.removeEventListener('aptos#initialized', handleWalletChange);
        window.removeEventListener('load', handleWalletChange);
      };
    }
  }, [checkConnection]);

  // Connect wallet
  const connectWallet = useCallback(async () => {
    // Wait for the Petra wallet to be injected if not immediately available
    if (!window.aptos) {
      let attempts = 0;
      const maxAttempts = 3;
      while (!window.aptos && attempts < maxAttempts) {
        console.log(`Waiting for Petra extension to load... attempt ${attempts + 1}`);
        await new Promise(resolve => setTimeout(resolve, 1000));
        attempts++;
      }
      if (!window.aptos) {
        toast({
          title: "Petra Wallet Not Found",
          description: "Please install Petra wallet in your browser and refresh the page.",
          variant: "destructive",
        });
        // do not auto-open external site; user may be on wrong browser
        return;
      }
    }

    setWalletState(prev => ({ ...prev, isConnecting: true }));
    console.log("Attempting to connect wallet...");

    try {
      // Add timeout to prevent infinite loading
      const connectPromise = window.aptos.connect();
      let timeoutId: ReturnType<typeof setTimeout> | null = null;
      const timeoutPromise = new Promise((_, reject) => {
        timeoutId = setTimeout(() => {
          console.error("Wallet connection timed out");
          reject(new Error('Connection timeout'));
        }, 30000);
      });

      const response = await Promise.race([connectPromise, timeoutPromise]) as { address: string; publicKey: string };
      if (timeoutId) clearTimeout(timeoutId);

      console.log("Wallet connected successfully:", response);

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
      // Clear stored connection state in case of error
      localStorage.removeItem('walletConnected');
      localStorage.removeItem('walletAddress');

      setWalletState(prev => ({ ...prev, isConnecting: false }));

      if (error.message === 'Connection timeout') {
        toast({
          title: "Connection Timeout",
          description: "Wallet connection timed out. Please try again.",
          variant: "destructive",
        });
      } else if (error.code === 4001) {
        toast({
          title: "Connection Rejected",
          description: "Please approve the connection request to continue.",
          variant: "destructive",
        });
      } else if (error.message && error.message.toLowerCase().includes("forgot")) {
        toast({
          title: "Password Issue",
          description: "It appears you may have forgotten your wallet password. Please reset your password or try signing in with Google.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Connection Failed",
          description: "Failed to connect wallet. Please try again or refresh the page. Alternatively, sign in with Google.",
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

  // Sign in with Google
  const signInWithGoogle = useCallback(async () => {
    console.log("Signing in with Google...");
    try {
      // TODO: Implement Google authentication logic (e.g., using Firebase or Google API)
      // For demonstration, we simulate a successful response.
      const response = { email: "user@gmail.com", displayName: "User" };
      setWalletState(prev => ({
        ...prev,
        isConnected: true,
        account: response.email,
      }));
      toast({
        title: "Signed in with Google",
        description: `Welcome, ${response.displayName}!`,
      });
    } catch (error: any) {
      console.error("Google sign in failed:", error);
      toast({
        title: "Google Sign In Failed",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  }, [toast]);

  return {
    ...walletState,
    connectWallet,
    disconnectWallet,
    signAndSubmitTransaction,
    getNetwork,
    signInWithGoogle,
  };
};