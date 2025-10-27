import { describe, it, expect } from 'vitest'
import { render, screen } from '../../test/utils'
import EnvironmentError from '../EnvironmentError'

describe('EnvironmentError', () => {
  const mockMissingVariables = ['VITE_OP20_TOKEN_ADDRESS', 'VITE_WALLET_CONNECT_PROJECT_ID']

  it('renders error message', () => {
    render(<EnvironmentError missingVariables={mockMissingVariables} />)
    expect(screen.getByText('Configuration Error')).toBeInTheDocument()
  })

  it('shows missing variables', () => {
    render(<EnvironmentError missingVariables={mockMissingVariables} />)
    expect(screen.getByText('VITE_OP20_TOKEN_ADDRESS')).toBeInTheDocument()
  })
})
