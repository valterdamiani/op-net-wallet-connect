import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import LanguageSelector from '../LanguageSelector'

describe('LanguageSelector', () => {
  it('renders language selector', () => {
    render(<LanguageSelector />)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })
})
