import { vi } from 'vitest'

// Mock data for testing
export const mockTokenMetadata = {
  name: 'Test Token',
  symbol: 'TEST',
  decimals: 18,
  maxSupply: '1000000',
  totalSupply: '500000',
}

export const mockConnectedData = {
  userBalance: '1000.0',
  allowance: '500.0',
  networkName: 'OP Net Testnet (Chain ID: 123)',
}

export const mockTransaction = {
  id: '0x1234567890abcdef',
  type: 'transfer' as const,
  status: 'success' as const,
  timestamp: new Date('2024-01-01T00:00:00Z'),
  amount: '100.0',
  recipient: '0xabcdef1234567890',
}

export const mockTransactions = [
  mockTransaction,
  {
    id: '0xabcdef1234567890',
    type: 'approve' as const,
    status: 'pending' as const,
    timestamp: new Date('2024-01-02T00:00:00Z'),
    amount: '50.0',
    spender: '0x1234567890abcdef',
  },
]

// Mock functions
export const mockConnectWallet = vi.fn()
export const mockDisconnectWallet = vi.fn()
export const mockOnTransfer = vi.fn()

// Mock environment variables
export const mockEnv = {
  VITE_OP20_TOKEN_ADDRESS: '0xtest-token-address',
  VITE_WALLET_CONNECT_PROJECT_ID: 'test-project-id',
  VITE_OPNET_RPC_URL: 'https://test-rpc.com',
  VITE_OPNET_CHAIN_ID: '123',
  VITE_OPNET_CHAIN_NAME: 'Test Network',
  VITE_OPNET_CURRENCY_NAME: 'Test Currency',
  VITE_OPNET_CURRENCY_SYMBOL: 'TEST',
  VITE_OPNET_CURRENCY_DECIMALS: '18',
}

// Mock wallet info
export const mockWalletInfo = {
  address: '0x1234567890abcdef1234567890abcdef12345678',
  chainId: '123',
  networkName: 'Test Network',
}

// Mock transaction result
export const mockTransactionResult = {
  hash: '0xtransaction-hash',
  status: 'pending' as const,
}

// Mock i18n translations
export const mockTranslations = {
  'main.title': 'OP Net Wallet Connect',
  'main.subtitle': 'Connect to OpNet blockchain and interact with OP_20 tokens',
  'main.wallet.connected': 'Connected',
  'main.wallet.disconnected': 'Disconnected',
  'main.wallet.connectingTitle': 'Connecting to Wallet',
  'main.wallet.connectingMessage': 'Please approve the connection in your wallet',
  'main.wallet.yourTokenData': 'Your Token Data',
  'main.wallet.account': 'Account',
  'main.wallet.network': 'Network',
  'main.wallet.balance': 'Balance',
  'main.wallet.allowance': 'Allowance',
  'main.wallet.copied': 'Copied!',
  'main.wallet.copyToClipboard': 'Copy to clipboard',
  'main.wallet.notConnected': 'Not Connected',
  'main.transactions.title': 'Transactions',
  'main.transactions.noTransactions': 'No transactions yet',
  'main.transfer.title': 'Transfer Tokens',
  'main.transfer.transfer': 'Transfer',
  'main.transfer.recipient': 'Recipient',
  'main.transfer.amount': 'Amount',
  'main.transfer.placeholder.recipient': 'Enter recipient address',
  'main.transfer.placeholder.amount': 'Enter amount',
  'main.transfer.send': 'Send',
  'main.transfer.cancel': 'Cancel',
  'main.transfer.sending': 'Sending...',
  'main.tokenInfo.title': 'Token Information',
  'main.tokenInfo.name': 'Name',
  'main.tokenInfo.symbol': 'Symbol',
  'main.tokenInfo.decimals': 'Decimals',
  'main.tokenInfo.maxSupply': 'Max Supply',
  'main.tokenInfo.totalSupply': 'Total Supply',
  'main.tokenInfo.address': 'Address',
  'header.title': 'OP Net Wallet',
  'header.nav.home': 'Home',
  'header.nav.features': 'Features',
  'header.nav.about': 'About',
  'footer.copyright': '© 2024 OP Net Wallet Connect',
  'about.title': 'About OP Net',
  'about.description': 'OP Net is a revolutionary blockchain platform',
  'about.network': 'Network',
  'about.networkValue': 'OP Net Testnet',
  'about.chainId': 'Chain ID',
  'about.chainIdValue': '123',
  'about.rpcUrl': 'RPC URL',
  'about.rpcUrlValue': 'https://regtest.opnet.org',
  'about.tokenStandard': 'Token Standard',
  'about.tokenStandardValue': 'OP-20',
  'features.title': 'Features',
  'features.walletConnect.title': 'Wallet Connect',
  'features.walletConnect.description': 'Connect your wallet seamlessly',
  'features.tokenMetadata.title': 'Token Metadata',
  'features.tokenMetadata.description': 'View token information',
  'features.balanceAllowance.title': 'Balance & Allowance',
  'features.balanceAllowance.description': 'Check your token balance and allowance',
  'features.transactions.title': 'Transactions',
  'features.transactions.description': 'Track your transaction history',
  'features.opnetTestnet.title': 'OP Net Testnet',
  'features.opnetTestnet.description': 'Built on OP Net testnet',
  'features.secure.title': 'Secure',
  'features.secure.description': 'Your funds are secure',
  'language.select': 'Select Language',
  'language.english': 'English',
  'language.french': 'French',
}

// Mock console methods
export const mockConsole = {
  log: vi.fn(),
  error: vi.fn(),
  warn: vi.fn(),
  info: vi.fn(),
}

// Mock window methods
export const mockWindow = {
  matchMedia: vi.fn(() => ({
    matches: false,
    media: '',
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
  location: {
    href: 'http://localhost:3000',
    origin: 'http://localhost:3000',
    pathname: '/',
    search: '',
    hash: '',
  },
}

// Mock navigator methods
export const mockNavigator = {
  clipboard: {
    writeText: vi.fn(() => Promise.resolve()),
    readText: vi.fn(() => Promise.resolve('')),
  },
  userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
}

// Mock localStorage
export const mockLocalStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
  length: 0,
  key: vi.fn(),
}

// Mock sessionStorage
export const mockSessionStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
  length: 0,
  key: vi.fn(),
}

// Mock fetch
export const mockFetch = vi.fn()

// Mock IntersectionObserver
export const mockIntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
  root: null,
  rootMargin: '',
  thresholds: [],
  takeRecords: vi.fn(() => []),
}))

// Mock ResizeObserver
export const mockResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}))

// Setup global mocks
export const setupGlobalMocks = () => {
  // Mock console
  Object.assign(console, mockConsole)
  
  // Mock window
  Object.defineProperty(window, 'matchMedia', {
    value: mockWindow.matchMedia,
    writable: true,
  })
  Object.defineProperty(window, 'location', {
    value: mockWindow.location,
    writable: true,
  })
  
  // Mock navigator
  Object.defineProperty(navigator, 'clipboard', {
    value: mockNavigator.clipboard,
    writable: true,
  })
  Object.defineProperty(navigator, 'userAgent', {
    value: mockNavigator.userAgent,
    writable: true,
  })
  
  // Mock localStorage
  Object.defineProperty(window, 'localStorage', {
    value: mockLocalStorage,
    writable: true,
  })
  
  // Mock sessionStorage
  Object.defineProperty(window, 'sessionStorage', {
    value: mockSessionStorage,
    writable: true,
  })
  
  // Mock fetch
  global.fetch = mockFetch
  
  // Mock IntersectionObserver
  global.IntersectionObserver = mockIntersectionObserver
  
  // Mock ResizeObserver
  global.ResizeObserver = mockResizeObserver
}

// Cleanup mocks
export const cleanupMocks = () => {
  vi.clearAllMocks()
  mockConsole.log.mockClear()
  mockConsole.error.mockClear()
  mockConsole.warn.mockClear()
  mockConsole.info.mockClear()
  mockNavigator.clipboard.writeText.mockClear()
  mockNavigator.clipboard.readText.mockClear()
  mockLocalStorage.getItem.mockClear()
  mockLocalStorage.setItem.mockClear()
  mockLocalStorage.removeItem.mockClear()
  mockLocalStorage.clear.mockClear()
  mockSessionStorage.getItem.mockClear()
  mockSessionStorage.setItem.mockClear()
  mockSessionStorage.removeItem.mockClear()
  mockSessionStorage.clear.mockClear()
  mockFetch.mockClear()
  mockIntersectionObserver.mockClear()
  mockResizeObserver.mockClear()
}
