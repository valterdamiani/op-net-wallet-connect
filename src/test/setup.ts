import '@testing-library/jest-dom'
import { vi } from 'vitest'
import { setupGlobalMocks, mockEnv, mockTranslations } from './mocks'

// Setup global mocks
setupGlobalMocks()

// Mock environment variables
vi.mock('import.meta.env', () => mockEnv)

// Mock react-i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => (mockTranslations as Record<string, string>)[key] || key,
    i18n: {
      changeLanguage: vi.fn(),
      language: 'en',
    },
  }),
  I18nextProvider: ({ children }: { children: React.ReactNode }) => children,
}))

// Mock i18n instance
vi.mock('../i18n', () => ({
  default: {
    t: (key: string) => (mockTranslations as Record<string, string>)[key] || key,
    changeLanguage: vi.fn(),
    language: 'en',
  },
}))
