import { describe, it, expect } from 'vitest'
import { render, screen } from '../../../test/utils'
import FeaturesSection from '../FeaturesSection'

describe('FeaturesSection', () => {
  it('renders features section with heading', () => {
    render(<FeaturesSection />)
    expect(screen.getByRole('heading', { level: 3 })).toBeInTheDocument()
  })

  it('renders feature cards', () => {
    render(<FeaturesSection />)
    const cardHeadings = screen.getAllByRole('heading', { level: 4 })
    expect(cardHeadings.length).toBeGreaterThan(0)
  })
})
