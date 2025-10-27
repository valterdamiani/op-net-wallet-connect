import { describe, it, expect } from 'vitest'
import { render, screen } from '../../test/utils'
import LanguageSelector from '../LanguageSelector'

describe('LanguageSelector', () => {
  it('renders language selector', () => {
    render(<LanguageSelector />)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })
})
