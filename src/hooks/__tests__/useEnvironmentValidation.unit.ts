import { describe, it, expect } from 'vitest'
import { renderHook } from '@testing-library/react'
import useEnvironmentValidation from '../useEnvironmentValidation'

describe('useEnvironmentValidation', () => {
  it('returns validation result', () => {
    const { result } = renderHook(() => useEnvironmentValidation())
    expect(result.current).toHaveProperty('isValid')
    expect(result.current).toHaveProperty('missingVariables')
  })
})
