import { describe, it, expect } from 'vitest'
import { render, screen } from '../../test/utils'
import Card from '../Card'

describe('Card', () => {
  it('renders with props', () => {
    render(<Card icon="🔗" title="Test Title" description="Test Description" />)

    expect(screen.getByText('Test Title')).toBeInTheDocument()
    expect(screen.getByText('Test Description')).toBeInTheDocument()
  })

  it('applies correct classes', () => {
    const { container } = render(<Card icon="🔗" title="Test" description="Test" />)
    expect(container.firstChild).toHaveClass('bg-slate-800/95')
  })
})
