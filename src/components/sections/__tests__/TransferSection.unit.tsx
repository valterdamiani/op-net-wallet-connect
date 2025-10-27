import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '../../../test/utils'
import TransferSection from '../TransferSection'

describe('TransferSection', () => {
  const mockOnTransfer = vi.fn()

  it('renders transfer section with heading', () => {
    render(<TransferSection onTransfer={mockOnTransfer} isConnected={true} balance="1000" isTransferring={false} />)
    expect(screen.getByRole('heading')).toBeInTheDocument()
  })

  it('shows transfer button when connected', () => {
    render(<TransferSection onTransfer={mockOnTransfer} isConnected={true} balance="1000" isTransferring={false} />)
    const transferButton = screen.getByRole('button', { name: /transfer/i })
    expect(transferButton).toBeInTheDocument()
  })

  it('opens form when transfer button clicked', () => {
    render(<TransferSection onTransfer={mockOnTransfer} isConnected={true} balance="1000" isTransferring={false} />)
    const transferButton = screen.getByRole('button', { name: /transfer/i })
    fireEvent.click(transferButton)
    expect(screen.getByPlaceholderText(/recipient address/i)).toBeInTheDocument()
  })
})
