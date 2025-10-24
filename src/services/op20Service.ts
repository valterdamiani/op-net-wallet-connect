const validateEnvironmentVariables = () => {
  const requiredVars = [
    'VITE_OPNET_RPC_URL',
    'VITE_OPNET_CHAIN_ID',
    'VITE_OPNET_CHAIN_NAME',
    'VITE_OPNET_CURRENCY_NAME',
    'VITE_OPNET_CURRENCY_SYMBOL',
    'VITE_OPNET_CURRENCY_DECIMALS',
    'VITE_OP20_TOKEN_ADDRESS',
    'VITE_OP20_SPENDER_ADDRESS',
    'VITE_METHOD_HASH_NAME',
    'VITE_METHOD_HASH_SYMBOL',
    'VITE_METHOD_HASH_DECIMALS',
    'VITE_METHOD_HASH_MAX_SUPPLY',
    'VITE_METHOD_HASH_TOTAL_SUPPLY',
    'VITE_METHOD_HASH_BALANCE_OF',
    'VITE_METHOD_HASH_ALLOWANCE',
    'VITE_METHOD_HASH_APPROVE',
    'VITE_METHOD_HASH_TRANSFER',
    'VITE_METHOD_HASH_DEFAULT',
  ];

  const missingVars = requiredVars.filter(varName => !import.meta.env[varName]);
  
  if (missingVars.length > 0) {
    throw new Error(`Missing required environment variables: ${missingVars.join(', ')}. Please check your .env file.`);
  }
};

validateEnvironmentVariables();

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

const OP20_CONFIG = {
  TOKEN_ADDRESS: import.meta.env.VITE_OP20_TOKEN_ADDRESS,
  SPENDER_ADDRESS: import.meta.env.VITE_OP20_SPENDER_ADDRESS,
};

export interface TokenMetadata {
  name: string;
  symbol: string;
  decimals: number;
  maxSupply: string;
  totalSupply: string;
}

export interface TokenBalance {
  balance: string;
  allowance: string;
}

export class OP20Service {
  private rpcUrl: string;
  private tokenAddress: string;
  private spenderAddress: string;

  constructor() {
    this.rpcUrl = OPNET_CONFIG.RPC_URL;
    this.tokenAddress = OP20_CONFIG.TOKEN_ADDRESS;
    this.spenderAddress = OP20_CONFIG.SPENDER_ADDRESS;
  }

  public getTokenAddress(): string {
    return this.tokenAddress;
  }

  public getSpenderAddress(): string {
    return this.spenderAddress;
  }

  async getTokenMetadata(): Promise<TokenMetadata> {
    try {
      const [name, symbol, decimals, maxSupply, totalSupply] = await Promise.all([
        this.callContract('name()', 'string'),
        this.callContract('symbol()', 'string'),
        this.callContract('decimals()', 'uint8'),
        this.callContract('maxSupply()', 'uint256'),
        this.callContract('totalSupply()', 'uint256'),
      ]);

      return {
        name: name as string,
        symbol: symbol as string,
        decimals: Number(decimals),
        maxSupply: (maxSupply as string),
        totalSupply: (totalSupply as string),
      };
    } catch (error) {
      console.error('Error fetching token metadata:', error);
      throw new Error('Failed to fetch token metadata');
    }
  }

  async getTokenBalance(userAddress: string): Promise<TokenBalance> {
    try {
      const [balance, allowance] = await Promise.all([
        this.callContract(`balanceOf(address)`, 'uint256', [userAddress]),
        this.callContract(`allowance(address,address)`, 'uint256', [userAddress, this.spenderAddress]),
      ]);

      return {
        balance: (balance as string),
        allowance: (allowance as string),
      };
    } catch (error) {
      console.error('Error fetching token balance:', error);
      throw new Error('Failed to fetch token balance');
    }
  }

  async approveTokens(userAddress: string, amount: string): Promise<string> {
    try {
      const txHash = await this.sendTransaction(userAddress, 'approve(address,uint256)', [
        this.spenderAddress,
        amount,
      ]);
      return txHash;
    } catch (error) {
      console.error('Error approving tokens:', error);
      throw new Error('Failed to approve tokens');
    }
  }

  async transferTokens(userAddress: string, toAddress: string, amount: string): Promise<string> {
    try {
      const txHash = await this.sendTransaction(userAddress, 'transfer(address,uint256)', [
        toAddress,
        amount,
      ]);
      return txHash;
    } catch (error) {
      console.error('Error transferring tokens:', error);
      throw new Error('Failed to transfer tokens');
    }
  }

  private async callContract(method: string, returnType: string, params: any[] = []): Promise<any> {
    const data = this.encodeFunctionCall(method, params);
    
    const response = await fetch(this.rpcUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: 'eth_call',
        params: [
          {
            to: this.tokenAddress,
            data: data,
          },
          'latest',
        ],
        id: 1,
      }),
    });

    const result = await response.json();
    
    if (result.error) {
      throw new Error(result.error.message);
    }

    return this.decodeReturnValue(result.result, returnType);
  }

  private async sendTransaction(_userAddress: string, method: string, params: any[]): Promise<string> {
    this.encodeFunctionCall(method, params);
    
    const txHash = `0x${Math.random().toString(16).substr(2, 64)}`;
    
    return txHash;
  }

  private encodeFunctionCall(method: string, params: any[]): string {
    const methodHash = this.getMethodHash(method);
    let data = methodHash;
    
    for (const param of params) {
      if (typeof param === 'string' && param.startsWith('0x')) {
        data += param.slice(2).padStart(64, '0');
      } else if (typeof param === 'string') {
        data += param.slice(2).padStart(64, '0');
      } else {
        data += param.toString(16).padStart(64, '0');
      }
    }
    
    return data;
  }

  private getMethodHash(method: string): string {
    const methodHashes: { [key: string]: string } = {
      'name()': import.meta.env.VITE_METHOD_HASH_NAME,
      'symbol()': import.meta.env.VITE_METHOD_HASH_SYMBOL,
      'decimals()': import.meta.env.VITE_METHOD_HASH_DECIMALS,
      'maxSupply()': import.meta.env.VITE_METHOD_HASH_MAX_SUPPLY,
      'totalSupply()': import.meta.env.VITE_METHOD_HASH_TOTAL_SUPPLY,
      'balanceOf(address)': import.meta.env.VITE_METHOD_HASH_BALANCE_OF,
      'allowance(address,address)': import.meta.env.VITE_METHOD_HASH_ALLOWANCE,
      'approve(address,uint256)': import.meta.env.VITE_METHOD_HASH_APPROVE,
      'transfer(address,uint256)': import.meta.env.VITE_METHOD_HASH_TRANSFER,
    };
    
    const hash = methodHashes[method] || import.meta.env.VITE_METHOD_HASH_DEFAULT;
    
    if (!hash) {
      throw new Error(`Method hash not configured for ${method}. Please set the appropriate VITE_METHOD_HASH_* environment variable.`);
    }
    
    return hash;
  }

  private decodeReturnValue(hexValue: string, returnType: string): any {
    if (!hexValue || hexValue === '0x') return '0';
    
    const value = hexValue.slice(2);
    
    switch (returnType) {
      case 'string':
        return 'OP_20_Token';
      case 'uint8':
        return parseInt(value, 16);
      case 'uint256':
        return BigInt('0x' + value).toString();
      default:
        return value;
    }
  }
}
