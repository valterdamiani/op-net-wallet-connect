import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '../../test/utils'
import LabelValue from '../LabelValue'

vi.mock('../CopyButton', () => ({
  default: ({ value }: { value: string | number }) => <button data-testid="copy-button">{value}</button>
}))

describe('LabelValue', () => {
  it('renders label and value', () => {
    render(<LabelValue label="Test Label" value="Test Value" />)
    expect(screen.getByText('Test Label')).toBeInTheDocument()
    expect(screen.getByText('Test Value')).toBeInTheDocument()
  })

  it('shows copy button when connected', () => {
    render(<LabelValue label="Address" value="0x123" showCopyButton={true} isConnected={true} />)
    expect(screen.getByTestId('copy-button')).toBeInTheDocument()
  })
})
