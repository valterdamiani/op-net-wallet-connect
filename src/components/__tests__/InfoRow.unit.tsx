import { describe, it, expect } from 'vitest'
import { render, screen } from '../../test/utils'
import InfoRow from '../InfoRow'

describe('InfoRow', () => {
  it('renders label and value', () => {
    render(<InfoRow label="Test Label" value="Test Value" />)
    expect(screen.getByText('Test Label')).toBeInTheDocument()
    expect(screen.getByText('Test Value')).toBeInTheDocument()
  })
})
