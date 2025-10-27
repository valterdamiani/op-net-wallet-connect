import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '../../../test/utils'
import WalletSection from '../WalletSection'
import { ConnectionState } from '../../../types/connection'
import { TransactionType, TransactionStatus } from '../../../types/transaction'

describe('WalletSection', () => {
  const mockConnectedData = {
    userBalance: '1000',
    allowance: '500',
    networkName: 'Test Network'
  }

  const mockTransactions: Array<{
    id: string;
    type: TransactionType;
    status: TransactionStatus;
    timestamp: Date;
    amount?: string;
    recipient?: string;
    spender?: string;
  }> = []

  it('renders connecting state', () => {
    render(<WalletSection 
      isConnected={false}
      connectionState={ConnectionState.CONNECTING}
      address={null}
      connectedData={null}
      transactions={mockTransactions}
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
      transactions={mockTransactions}
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
      address="0x123"
      connectedData={mockConnectedData}
      transactions={mockTransactions}
      disconnectWallet={vi.fn()}
      handleConnectWallet={vi.fn()}
      onTransfer={vi.fn()}
      isTransferring={false}
    />)
    const disconnectButton = screen.getByRole('button', { name: /disconnect/i })
    expect(disconnectButton).toBeInTheDocument()
  })
})
