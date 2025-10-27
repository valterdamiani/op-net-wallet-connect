import React from 'react'
import { render, RenderOptions } from '@testing-library/react'

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, options)

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

export {
  screen,
  fireEvent,
  waitFor,
  act,
  renderHook,
  cleanup,
  within,
  getDefaultNormalizer,
} from '@testing-library/react'
export { customRender as render }
