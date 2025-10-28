import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import TransferSection from '../TransferSection'

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}))

describe('TransferSection', () => {
  const mockOnTransfer = vi.fn()

  it('renders transfer section with heading', () => {
    render(<TransferSection address={null} onTransfer={mockOnTransfer} isConnected={true} balance="1000" isTransferring={false} />)
    expect(screen.getByRole('heading')).toBeInTheDocument()
  })

  it('shows transfer button when connected', () => {
    render(<TransferSection address={null} onTransfer={mockOnTransfer} isConnected={true} balance="1000" isTransferring={false} />)
    const transferButton = screen.getByRole('button', { name: /transfer/i })
    expect(transferButton).toBeInTheDocument()
  })

  it('renders form with input fields', () => {
    render(<TransferSection address={null} onTransfer={mockOnTransfer} isConnected={true} balance="1000" isTransferring={false} />)
    const transferButton = screen.getByRole('button', { name: /transfer/i })
    fireEvent.click(transferButton)
    expect(screen.getByTestId('recipient-input')).toBeInTheDocument()
    expect(screen.getByTestId('amount-input')).toBeInTheDocument()
  })
})
