import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
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
    render(<UserTokenData isConnected={true} address={null} connectedData={mockConnectedData} />)
    expect(screen.getByTestId('user-token-data')).toBeInTheDocument()
  })

  it('renders when disconnected', () => {
    const mockConnectedData = {
      userBalance: "0",
      allowance: "0",
      networkName: "Test Network"
    }
    render(<UserTokenData isConnected={false} address={null} connectedData={mockConnectedData} />)
    expect(screen.getByTestId('user-token-data')).toBeInTheDocument()
  })
})
