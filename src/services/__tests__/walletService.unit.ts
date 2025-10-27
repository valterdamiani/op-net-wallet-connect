import { describe, it, expect } from 'vitest'
import { WalletService } from '../walletService'

describe('WalletService', () => {
  it('creates service instance', () => {
    const service = new WalletService()
    expect(service).toBeDefined()
  })

  it('has required methods', () => {
    const service = new WalletService()
    expect(typeof service.connect).toBe('function')
    expect(typeof service.disconnect).toBe('function')
    expect(typeof service.sendTransaction).toBe('function')
  })
})
