import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import AboutSection from '../AboutSection'

describe('AboutSection', () => {
  it('renders about section with heading', () => {
    render(<AboutSection />)
    expect(screen.getByRole('heading')).toBeInTheDocument()
  })

  it('renders section content', () => {
    render(<AboutSection />)
    const section = document.querySelector('section')
    expect(section).toBeInTheDocument()
    expect(section?.tagName).toBe('SECTION')
  })
})
