import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import InfoRow from '../InfoRow'

describe('InfoRow', () => {
  it('renders label and value', () => {
    render(<InfoRow label="Test Label" value="Test Value" />)
    expect(screen.getByText('Test Label')).toBeInTheDocument()
    expect(screen.getByText('Test Value')).toBeInTheDocument()
  })
})
