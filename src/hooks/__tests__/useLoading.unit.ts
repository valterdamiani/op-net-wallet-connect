import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useLoading } from '../useLoading'

describe('useLoading', () => {
  it('returns loading state', () => {
    const { result } = renderHook(() => useLoading())
    expect(result.current.loading).toBe(false)
  })

  it('sets loading state', () => {
    const { result } = renderHook(() => useLoading())
    act(() => {
      result.current.startLoading()
    })
    expect(result.current.loading).toBe(true)
  })
})
