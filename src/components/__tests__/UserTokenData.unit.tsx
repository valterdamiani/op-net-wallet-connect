import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '../../test/utils'
import UserTokenData from '../UserTokenData'

vi.mock('../LabelValue', () => ({
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

describe('UserTokenData', () => {
  it('renders when connected', () => {
    const mockConnectedData = {
      userBalance: "1000",
      allowance: "500", 
      networkName: "Test Network"
    }
    render(<UserTokenData isConnected={true} address="0x123" connectedData={mockConnectedData} />)
    expect(screen.getByText('Your Token Data')).toBeInTheDocument()
  })

  it('renders when disconnected', () => {
    const mockConnectedData = {
      userBalance: "0",
      allowance: "0",
      networkName: "Test Network"
    }
    render(<UserTokenData isConnected={false} address={null} connectedData={mockConnectedData} />)
    expect(screen.getByText('Your Token Data')).toBeInTheDocument()
  })
})
