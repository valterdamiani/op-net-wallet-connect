import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '../../test/utils'
import TransactionModal from '../TransactionModal'

describe('TransactionModal', () => {
  const mockOnClose = vi.fn()

  it('renders modal when open', () => {
    render(<TransactionModal isOpen={true} onClose={mockOnClose} transactionHash="0x123" status="success" />)
    expect(screen.getByText('Transaction Result')).toBeInTheDocument()
  })

  it('does not render when closed', () => {
    render(<TransactionModal isOpen={false} onClose={mockOnClose} transactionHash="0x123" status="success" />)
    expect(screen.queryByText('Transaction Result')).not.toBeInTheDocument()
  })
})
