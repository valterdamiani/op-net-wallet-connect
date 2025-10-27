import { describe, it, expect } from 'vitest'
import { render, screen } from '../../test/utils'
import Footer from '../Footer'

describe('Footer', () => {
  it('renders footer element', () => {
    render(<Footer />)
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
  })
})
