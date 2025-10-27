import { describe, it, expect } from 'vitest'
import { render, screen } from '../../test/utils'
import Section from '../Section'

describe('Section', () => {
  it('renders with title', () => {
    render(<Section title="Test Section">Content</Section>)
    expect(screen.getByText('Test Section')).toBeInTheDocument()
    expect(screen.getByText('Content')).toBeInTheDocument()
  })
})
