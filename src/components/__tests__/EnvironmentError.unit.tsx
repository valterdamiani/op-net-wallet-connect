import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import EnvironmentError from '../EnvironmentError'

describe('EnvironmentError', () => {
  const mockMissingVariables = ['VITE_MOTO_TOKEN']

  it('renders error message', () => {
    render(<EnvironmentError missingVariables={mockMissingVariables} />)
    expect(screen.getByText('Configuration Error')).toBeInTheDocument()
  })

  it('shows missing variables', () => {
    render(<EnvironmentError missingVariables={mockMissingVariables} />)
    expect(screen.getByText('VITE_MOTO_TOKEN')).toBeInTheDocument()
  })
})
