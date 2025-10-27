import { describe, it, expect, vi, beforeAll } from 'vitest'
import { render, screen, fireEvent } from '../../test/utils'
import CopyButton from '../CopyButton'

describe('CopyButton', () => {
  const mockWriteText = vi.fn()

  beforeAll(() => {
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: mockWriteText },
      writable: true,
    })
  })

  it('renders button', () => {
    render(<CopyButton value="test" />)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('copies value on click', async () => {
    render(<CopyButton value="test" />)
    fireEvent.click(screen.getByRole('button'))
    expect(mockWriteText).toHaveBeenCalledWith('test')
  })
})
