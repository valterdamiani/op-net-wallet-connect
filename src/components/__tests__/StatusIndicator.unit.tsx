import { describe, it, expect } from 'vitest'
import { render, screen } from '../../test/utils'
import StatusIndicator from '../StatusIndicator'

describe('StatusIndicator', () => {
  it('renders disconnected state', () => {
    render(<StatusIndicator isConnected={false} account={null} networkName="Test Network" />)
    expect(screen.getByText(/disconnected/i)).toBeInTheDocument()
  })

  it('renders connected state', () => {
    render(<StatusIndicator isConnected={true} account="0x123" networkName="Test Network" />)
    expect(screen.getByText(/connected/i)).toBeInTheDocument()
  })
})
