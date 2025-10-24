const WALLETCONNECT_CONFIG = {
  PROJECT_ID: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID,
  METADATA: {
    name: import.meta.env.VITE_APP_NAME || 'OP Net Wallet Connect',
    description: import.meta.env.VITE_APP_DESCRIPTION || 'Connect to OpNet blockchain and interact with OP_20 tokens',
    url: import.meta.env.VITE_APP_URL || 'https://opnet.org',
    icons: [import.meta.env.VITE_APP_ICON || 'https://opnet.org/icon.png'],
  },
};

const OPNET_CONFIG = {
  RPC_URL: import.meta.env.VITE_OPNET_RPC_URL,
  CHAIN_ID: import.meta.env.VITE_OPNET_CHAIN_ID,
  CHAIN_NAME: import.meta.env.VITE_OPNET_CHAIN_NAME,
  NATIVE_CURRENCY: {
    name: import.meta.env.VITE_OPNET_CURRENCY_NAME,
    symbol: import.meta.env.VITE_OPNET_CURRENCY_SYMBOL,
    decimals: parseInt(import.meta.env.VITE_OPNET_CURRENCY_DECIMALS),
  },
};

export interface WalletInfo {
  address: string;
  chainId: string;
  networkName: string;
}

export interface TransactionResult {
  hash: string;
  status: 'pending' | 'success' | 'failed';
}

export class WalletService {
  private walletConnect: any;
  private isConnected: boolean = false;
  private currentAccount: string | null = null;

  constructor() {
    this.initializeWalletConnect();
  }

  private async initializeWalletConnect() {
    try {
      const { WalletConnect } = await import('@btc-vision/walletconnect');
      
      this.walletConnect = new (WalletConnect as any)({
        projectId: WALLETCONNECT_CONFIG.PROJECT_ID,
        metadata: WALLETCONNECT_CONFIG.METADATA,
        chains: [OPNET_CONFIG.CHAIN_ID],
        methods: [
          'eth_requestAccounts',
          'eth_sendTransaction',
          'eth_call',
          'eth_getBalance',
        ],
      });

      this.walletConnect.on('connect', this.handleConnect.bind(this));
      this.walletConnect.on('disconnect', this.handleDisconnect.bind(this));
      this.walletConnect.on('session_update', this.handleSessionUpdate.bind(this));
    } catch (error) {
      console.error('Failed to initialize WalletConnect:', error);
    }
  }

  async connect(): Promise<WalletInfo> {
    try {
      if (!this.walletConnect) {
        throw new Error('WalletConnect not initialized');
      }

      const session = await this.walletConnect.connect();
      
      if (session && session.accounts && session.accounts.length > 0) {
        this.isConnected = true;
        this.currentAccount = session.accounts[0];
        
        return {
          address: session.accounts[0],
          chainId: session.chainId || OPNET_CONFIG.CHAIN_ID,
          networkName: OPNET_CONFIG.CHAIN_NAME,
        };
      }
      
      throw new Error('No accounts found');
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      throw error;
    }
  }

  async disconnect(): Promise<void> {
    try {
      if (this.walletConnect && this.isConnected) {
        await this.walletConnect.disconnect();
      }
      
      this.isConnected = false;
      this.currentAccount = null;
    } catch (error) {
      console.error('Failed to disconnect wallet:', error);
      throw error;
    }
  }

  async sendTransaction(to: string, data: string, value?: string): Promise<TransactionResult> {
    try {
      if (!this.isConnected || !this.currentAccount) {
        throw new Error('Wallet not connected');
      }

      const txParams = {
        from: this.currentAccount,
        to: to,
        data: data,
        value: value || '0x0',
      };

      const txHash = await this.walletConnect.request({
        method: 'eth_sendTransaction',
        params: [txParams],
      });

      return {
        hash: txHash,
        status: 'pending',
      };
    } catch (error) {
      console.error('Failed to send transaction:', error);
      throw error;
    }
  }

  async callContract(to: string, data: string): Promise<string> {
    try {
      const result = await this.walletConnect.request({
        method: 'eth_call',
        params: [
          {
            to: to,
            data: data,
          },
          'latest',
        ],
      });

      return result;
    } catch (error) {
      console.error('Failed to call contract:', error);
      throw error;
    }
  }

  getConnectionStatus(): boolean {
    return this.isConnected;
  }

  getCurrentAccount(): string | null {
    return this.currentAccount;
  }

  private handleConnect(session: any) {
    console.log('Wallet connected:', session);
    this.isConnected = true;
    this.currentAccount = session.accounts[0];
  }

  private handleDisconnect() {
    console.log('Wallet disconnected');
    this.isConnected = false;
    this.currentAccount = null;
  }

  private handleSessionUpdate(session: any) {
    console.log('Session updated:', session);
    if (session.accounts && session.accounts.length > 0) {
      this.currentAccount = session.accounts[0];
    }
  }
}
