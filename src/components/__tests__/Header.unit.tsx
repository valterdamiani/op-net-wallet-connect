import { describe, it, expect } from 'vitest'
import { render, screen } from '../../test/utils'
import Header from '../Header'

describe('Header', () => {
  it('renders header with title and navigation', () => {
    render(<Header />)
    
    expect(screen.getByRole('banner')).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
    expect(screen.getByRole('navigation')).toBeInTheDocument()
    
    const navLinks = screen.getAllByRole('link')
    expect(navLinks).toHaveLength(3)
    expect(screen.getByLabelText('Toggle mobile menu')).toBeInTheDocument()
  })
})
