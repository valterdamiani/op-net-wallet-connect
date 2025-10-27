import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '../../test/utils'
import LoadingButton from '../LoadingButton'

describe('LoadingButton', () => {
  const mockOnClick = vi.fn()

  it('renders button', () => {
    render(<LoadingButton onClick={mockOnClick} loading={false}>Click me</LoadingButton>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('shows loading state', () => {
    render(<LoadingButton onClick={mockOnClick} loading={true}>Click me</LoadingButton>)
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('calls onClick when clicked', () => {
    render(<LoadingButton onClick={mockOnClick} loading={false}>Click me</LoadingButton>)
    fireEvent.click(screen.getByText('Click me'))
    expect(mockOnClick).toHaveBeenCalled()
  })
})
