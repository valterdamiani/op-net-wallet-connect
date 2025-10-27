import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '../../../test/utils'
import TokenInfoSection from '../TokenInfoSection'

vi.mock('../../LabelValue', () => ({
  default: ({ label, value, showCopyButton, isConnected }: { 
    label: string; 
    value: string | number; 
    showCopyButton?: boolean; 
    isConnected?: boolean; 
  }) => (
    <div data-testid="label-value">
      <span data-testid="label">{label}</span>
      <span data-testid="value">{value}</span>
      {showCopyButton && isConnected && <span data-testid="copy-button">copy</span>}
    </div>
  )
}))

describe('TokenInfoSection', () => {
  const mockTokenMetadata = {
    name: 'Test Token',
    symbol: 'TEST',
    decimals: 18,
    maxSupply: '1000000',
    totalSupply: '500000'
  }

  it('renders token information section', () => {
    render(<TokenInfoSection tokenMetadata={mockTokenMetadata} address="0x123" isConnected={true} />)
    expect(screen.getByRole('heading')).toBeInTheDocument()
  })

  it('renders token metadata', () => {
    render(<TokenInfoSection tokenMetadata={mockTokenMetadata} address="0x123" isConnected={true} />)
    const labelValues = screen.getAllByTestId('label-value')
    expect(labelValues.length).toBeGreaterThan(0)
  })
})
