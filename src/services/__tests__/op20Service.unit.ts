import { describe, it, expect, vi } from 'vitest'

vi.mock('opnet', () => ({
  getContract: vi.fn(),
  OP_20_ABI: {},
  JSONRpcProvider: vi.fn(),
  IOP20Contract: {}
}))

vi.mock('@btc-vision/bitcoin', () => ({
  networks: {
    regtest: {}
  }
}))

vi.mock('@btc-vision/transaction', () => ({
  Address: {
    fromString: vi.fn()
  }
}))

vi.mock('import.meta.env', () => ({
  VITE_MOTO_TOKEN: '0x123'
}))

import { OP20Service } from '../op20Service'

describe('OP20Service', () => {
  it('creates service instance', () => {
    const service = new OP20Service()
    expect(service).toBeDefined()
  })

  it('has required methods', () => {
    const service = new OP20Service()
    expect(typeof service.getOp20Contract).toBe('function')
    expect(typeof service.getConnectedData).toBe('function')
    expect(typeof service.getTokenMetadata).toBe('function')
    expect(typeof service.safeTransferTokens).toBe('function')
  })
})
