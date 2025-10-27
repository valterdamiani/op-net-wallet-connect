import { vi } from 'vitest'

export const testConfig = {
  timeout: 10000,
  mockDelay: 100,

  mockData: {
    tokenAddress: '0xtest-token-address',
    walletAddress: '0x1234567890abcdef1234567890abcdef12345678',
    transactionHash: '0xtransaction-hash',
    chainId: '123',
    networkName: 'Test Network',
  },
  
  mockFunctions: {
    connectWallet: vi.fn(),
    disconnectWallet: vi.fn(),
    onTransfer: vi.fn(),
    onGetTransactionDetails: vi.fn(),
    onGetTransactionReceipt: vi.fn(),
  },
  
  mockPromises: {
    resolved: <T>(value: T) => Promise.resolve(value),
    rejected: <T>(error: T) => Promise.reject(error),
    delayed: <T>(value: T, delay = 100) => 
      new Promise<T>(resolve => setTimeout(() => resolve(value), delay)),
  },
  
  utilities: {
    createMockTransaction: (overrides = {}) => ({
      id: '0x1234567890abcdef',
      type: 'transfer',
      status: 'success',
      timestamp: new Date('2024-01-01T00:00:00Z'),
      amount: '100.0',
      recipient: '0xabcdef1234567890',
      ...overrides,
    }),
    
    createMockWalletInfo: (overrides = {}) => ({
      address: '0x1234567890abcdef1234567890abcdef12345678',
      chainId: '123',
      networkName: 'Test Network',
      ...overrides,
    }),
    
    createMockTokenMetadata: (overrides = {}) => ({
      name: 'Test Token',
      symbol: 'TEST',
      decimals: 18,
      maxSupply: '1000000',
      totalSupply: '500000',
      ...overrides,
    }),
    
    createMockConnectedData: (overrides = {}) => ({
      userBalance: '1000.0',
      allowance: '500.0',
      networkName: 'OP Net Testnet (Chain ID: 123)',
      ...overrides,
    }),
  },
  
  selectors: {
    testIds: {
      walletSection: 'wallet-section',
      userTokenData: 'user-token-data',
      transactionAccordion: 'transaction-accordion',
      transferSection: 'transfer-section',
      tokenInfoSection: 'token-info-section',
      labelValue: 'label-value',
      copyButton: 'copy-button',
    },
    
    classNames: {
      loading: 'animate-spin',
      connected: 'text-green-400',
      disconnected: 'text-red-400',
      pending: 'text-yellow-400',
      success: 'text-green-400',
      failed: 'text-red-400',
    },
  },
  
  scenarios: {
    connectionStates: {
      disconnected: {
        isConnected: false,
        connectionState: 'disconnected',
        address: null,
      },
      connecting: {
        isConnected: false,
        connectionState: 'connecting',
        address: null,
      },
      connected: {
        isConnected: true,
        connectionState: 'connected',
        address: '0x1234567890abcdef1234567890abcdef12345678',
      },
    },
    
    transactionStates: {
      pending: {
        status: 'pending',
        hash: '0xpending-hash',
      },
      success: {
        status: 'success',
        hash: '0xsuccess-hash',
      },
      failed: {
        status: 'failed',
        hash: '0xfailed-hash',
      },
    },
  },
}

export const {
  createMockTransaction,
  createMockWalletInfo,
  createMockTokenMetadata,
  createMockConnectedData,
} = testConfig.utilities

export const {
  testIds,
  classNames,
} = testConfig.selectors

export const {
  connectionStates,
  transactionStates,
} = testConfig.scenarios
