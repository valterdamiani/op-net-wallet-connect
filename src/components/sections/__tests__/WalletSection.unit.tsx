import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import WalletSection from '../WalletSection'
import { ConnectionState } from '../../../types/types'

describe('WalletSection', () => {
  const mockConnectedData = {
    userBalance: '1000',
    allowance: '500',
    networkName: 'Test Network'
  }

  it('renders connecting state', () => {
    render(<WalletSection 
      isConnected={false}
      connectionState={ConnectionState.CONNECTING}
      address={null}
      connectedData={null}
      disconnectWallet={vi.fn()}
      handleConnectWallet={vi.fn()}
      onTransfer={vi.fn()}
      isTransferring={false}
    />)
    expect(screen.getByRole('heading')).toBeInTheDocument()
  })

  it('renders disconnected state', () => {
    render(<WalletSection 
      isConnected={false}
      connectionState={ConnectionState.DISCONNECTED}
      address={null}
      connectedData={null}
      disconnectWallet={vi.fn()}
      handleConnectWallet={vi.fn()}
      onTransfer={vi.fn()}
      isTransferring={false}
    />)
    expect(document.querySelector('.mt-8')).toBeInTheDocument()
  })

  it('renders connected state', () => {
    render(<WalletSection 
      isConnected={true}
      connectionState={ConnectionState.CONNECTED}
      address={null}
      connectedData={mockConnectedData}
      disconnectWallet={vi.fn()}
      handleConnectWallet={vi.fn()}
      onTransfer={vi.fn()}
      isTransferring={false}
    />)
    const disconnectButton = screen.getByRole('button', { name: /disconnect/i })
    expect(disconnectButton).toBeInTheDocument()
  })
})
