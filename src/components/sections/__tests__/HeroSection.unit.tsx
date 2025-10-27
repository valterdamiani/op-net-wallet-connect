import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '../../../test/utils'
import HeroSection from '../HeroSection'
import { ConnectionState } from '../../../types/connection'

describe('HeroSection', () => {
  const mockProps = {
    tokenMetadata: {
      name: 'Test Token',
      symbol: 'TEST',
      decimals: 18,
      maxSupply: '1000000',
      totalSupply: '500000'
    },
    connectedData: {
      userBalance: '1000',
      allowance: '500',
      networkName: 'Test Network'
    },
    transactions: [],
    address: '0x123',
    isConnected: true,
    isTransferring: false,
    connectionState: ConnectionState.CONNECTED,
    connectWallet: vi.fn(),
    disconnectWallet: vi.fn(),
    onTransfer: vi.fn()
  }

  it('renders hero section with title and subtitle', () => {
    render(<HeroSection {...mockProps} />)
    
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument()
    
    const subtitle = screen.getByText((content, element) => {
      return element?.tagName === 'P' && content.includes('Connect to OpNet blockchain')
    })
    expect(subtitle).toBeInTheDocument()
  })

  it('renders wallet section when connected', () => {
    render(<HeroSection {...mockProps} />)
    
    expect(screen.getByText('Your Token Data')).toBeInTheDocument()
    expect(screen.getByText('Transfer Tokens')).toBeInTheDocument()
    expect(screen.getByText('Token Information')).toBeInTheDocument()
  })
})
