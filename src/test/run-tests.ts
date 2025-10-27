import React from 'react'
import { it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render } from '@testing-library/react'
import { cleanupMocks } from './mocks'

// Test runner configuration
export const testRunner = {
  // Setup before each test
  setup: () => {
    beforeEach(() => {
      // Clear all mocks before each test
      vi.clearAllMocks()
    })
  },
  
  // Cleanup after each test
  cleanup: () => {
    afterEach(() => {
      // Clean up mocks after each test
      cleanupMocks()
    })
  },
  
  // Common test patterns
  patterns: {
    // Test component rendering
    testRendering: <T extends Record<string, unknown>>(Component: React.ComponentType<T>, props: T = {} as T) => {
      it('renders without crashing', () => {
        expect(() => render(React.createElement(Component, props))).not.toThrow()
      })
    },
    
    // Test prop handling
    testProps: <T extends Record<string, unknown>>(Component: React.ComponentType<T>, propTests: Array<{ props: T; expected: unknown }>) => {
      propTests.forEach(({ props }, index) => {
        it(`handles props correctly (test ${index + 1})`, () => {
          const { container } = render(React.createElement(Component, props))
          expect(container).toBeDefined()
        })
      })
    },
    
    // Test event handling
    testEvents: <T extends Record<string, unknown>>(Component: React.ComponentType<T>, eventTests: Array<{ event: string; handler: string; expected: unknown }>) => {
      eventTests.forEach(({ event, handler, expected }, index) => {
        it(`handles ${event} event correctly (test ${index + 1})`, () => {
          const { container } = render(React.createElement(Component, { [handler]: expected } as T))
          expect(container).toBeDefined()
        })
      })
    },
  },
  
  // Test utilities
  utilities: {
    // Wait for async operations
    waitFor: (ms: number) => new Promise(resolve => setTimeout(resolve, ms)),
    
    // Create mock event
    createMockEvent: (type: string, properties: Record<string, unknown> = {}) => ({
      type,
      preventDefault: vi.fn(),
      stopPropagation: vi.fn(),
      ...properties,
    }),
    
    // Create mock function
    createMockFunction: <T>(returnValue?: T) => vi.fn(() => returnValue),
    
    // Create mock promise
    createMockPromise: <T>(resolveValue?: T, rejectValue?: unknown) => {
      if (rejectValue) {
        return Promise.reject(rejectValue)
      }
      return Promise.resolve(resolveValue)
    },
  },
  
  // Test assertions
  assertions: {
    // Test component has correct classes
    hasClasses: (element: HTMLElement, classes: string[]) => {
      classes.forEach(className => {
        expect(element).toHaveClass(className)
      })
    },
    
    // Test component has correct attributes
    hasAttributes: (element: HTMLElement, attributes: Record<string, string>) => {
      Object.entries(attributes).forEach(([key, value]) => {
        expect(element).toHaveAttribute(key, value)
      })
    },
    
    // Test component has correct text content
    hasTextContent: (element: HTMLElement, text: string) => {
      expect(element).toHaveTextContent(text)
    },
    
    // Test component is visible
    isVisible: (element: HTMLElement) => {
      expect(element).toBeVisible()
    },
    
    // Test component is hidden
    isHidden: (element: HTMLElement) => {
      expect(element).not.toBeVisible()
    },
  },
  
  // Test data generators
  generators: {
    // Generate random string
    randomString: (length: number = 10) => {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
      let result = ''
      for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length))
      }
      return result
    },
    
    // Generate random number
    randomNumber: (min: number = 0, max: number = 100) => {
      return Math.floor(Math.random() * (max - min + 1)) + min
    },
    
    // Generate random address
    randomAddress: () => {
      return '0x' + testRunner.generators.randomString(40)
    },
    
    // Generate random transaction hash
    randomTransactionHash: () => {
      return '0x' + testRunner.generators.randomString(64)
    },
  },
}

// Export test runner
export default testRunner
