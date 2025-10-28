import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import TransactionModal from '../TransactionModal'
import { TransactionStatus } from '../../types/types'

describe('TransactionModal', () => {
  const mockOnClose = vi.fn()

  it('renders modal when open', () => {
    render(<TransactionModal isOpen={true} onClose={mockOnClose} transactionHash="0x123" status={TransactionStatus.SUCCESS} />)
    expect(screen.getByText('main.transactions.modal.title')).toBeInTheDocument()
  })

  it('does not render when closed', () => {
    render(<TransactionModal isOpen={false} onClose={mockOnClose} transactionHash="0x123" status={TransactionStatus.SUCCESS} />)
    expect(screen.queryByText('main.transactions.modal.title')).not.toBeInTheDocument()
  })
})
