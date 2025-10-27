import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '../../test/utils'
import TransactionAccordion from '../TransactionAccordion'
import { TransactionType, TransactionStatus } from '../../types/transaction'

describe('TransactionAccordion', () => {
  const mockTransactions = [
    { id: '0x123', type: TransactionType.TRANSFER, status: TransactionStatus.SUCCESS, timestamp: new Date(), amount: '10', recipient: '0xdef' },
    { id: '0x456', type: TransactionType.APPROVE, status: TransactionStatus.PENDING, timestamp: new Date(), spender: '0xghi', amount: '50' }
  ]

  it('renders transactions accordion', () => {
    render(<TransactionAccordion transactions={mockTransactions} />)
    const accordionButton = screen.getByRole('button')
    expect(accordionButton).toBeInTheDocument()
  })

  it('expands when clicked', () => {
    render(<TransactionAccordion transactions={mockTransactions} />)
    const accordionButton = screen.getByRole('button')
    fireEvent.click(accordionButton)
    const formattedId = `${mockTransactions[0].id.slice(0, 8)}...${mockTransactions[0].id.slice(-8)}`
    expect(screen.getByText(formattedId)).toBeInTheDocument()
  })
})
