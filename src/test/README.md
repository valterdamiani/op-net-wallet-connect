# Test Documentation

This directory contains comprehensive unit tests for the OP Net Wallet Connect application using Vitest and React Testing Library.

## Test Structure

```
src/test/
├── setup.ts              # Test setup and global mocks
├── utils.tsx             # Test utilities and custom render
├── mocks.ts              # Mock data and functions
├── config.ts             # Test configuration
├── run-tests.ts          # Test runner utilities
└── README.md             # This documentation
```

## Test Categories

### 1. Component Tests
- **Basic Components**: Card, CopyButton, EnvironmentError, Footer, Header, InfoRow, LabelValue, LanguageSelector, LoadingButton, Section, StatusIndicator
- **Complex Components**: TransactionAccordion, TransactionModal, UserTokenData
- **Section Components**: AboutSection, FeaturesSection, HeroSection, TokenInfoSection, TransferSection, WalletSection

### 2. Hook Tests
- **useEnvironmentValidation**: Tests environment variable validation
- **useLoading**: Tests loading state management

### 3. Service Tests
- **OP20Service**: Tests blockchain interaction service
- **WalletService**: Tests wallet connection service

## Running Tests

### All Tests
```bash
npm run test
```

### Watch Mode
```bash
npm run test -- --watch
```

### UI Mode
```bash
npm run test:ui
```

### Coverage
```bash
npm run test:coverage
```

### Specific Test File
```bash
npm run test src/components/__tests__/Card.unit.tsx
```

### Specific Test Pattern
```bash
npm run test -- --grep "Card"
```

## Test Configuration

### Vitest Configuration
- **Test Environment**: jsdom (for DOM testing)
- **Setup Files**: `./src/test/setup.ts`
- **Include Pattern**: `**/*.unit.ts` and `**/*.unit.tsx`
- **JSX Support**: Automatic JSX transformation via esbuild

### Test File Naming
- **Unit Tests**: `*.unit.ts` or `*.unit.tsx`
- **Integration Tests**: `*.integration.ts` or `*.integration.tsx`
- **E2E Tests**: `*.e2e.ts` or `*.e2e.tsx`

## Testing Best Practices

### 1. Avoid Hard-coded Text
❌ **Don't do this:**
```typescript
expect(screen.getByText('Welcome to OP Net Wallet Connect')).toBeInTheDocument()
```

✅ **Do this instead:**
```typescript
expect(screen.getByRole('heading')).toBeInTheDocument()
// or
expect(screen.getByText(/welcome to op net/i)).toBeInTheDocument()
```

### 2. Use Role-based Selectors
```typescript
// Good - semantic and accessible
expect(screen.getByRole('button')).toBeInTheDocument()
expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument()
expect(screen.getByRole('combobox')).toBeInTheDocument()

// Better - more specific
expect(screen.getByRole('button', { name: /connect/i })).toBeInTheDocument()
```

### 3. Test Component Structure
```typescript
it('renders with proper structure', () => {
  render(<Component />)
  
  // Test that key elements exist
  expect(screen.getByRole('heading')).toBeInTheDocument()
  expect(screen.getAllByRole('button')).toHaveLength(3)
  expect(document.querySelector('section')).toBeInTheDocument()
})
```

### 4. Mock External Dependencies
```typescript
// Mock external libraries
vi.mock('opnet', () => ({
  getContract: vi.fn(),
  JSONRpcProvider: vi.fn(),
}))

// Mock environment variables
vi.mock('import.meta.env', () => ({
  VITE_OP20_TOKEN_ADDRESS: '0x123'
}))
```

### 5. Use Proper TypeScript Types
```typescript
// Good - explicit types
const mockTransactions: Array<{
  id: string;
  type: TransactionType;
  status: TransactionStatus;
  timestamp: Date;
}> = []

// Good - generic types
const resolved = <T>(value: T) => Promise.resolve(value)
```

## Mock Data

### Available Mock Data
- `mockTokenMetadata` - Token information
- `mockConnectedData` - Wallet connection data
- `mockTransactions` - Transaction history
- `mockTranslations` - i18n translations
- `mockEnv` - Environment variables

### Using Mock Data
```typescript
import { mockTokenMetadata, mockConnectedData } from '../../test/utils'

it('renders with mock data', () => {
  render(<Component 
    tokenMetadata={mockTokenMetadata}
    connectedData={mockConnectedData}
  />)
})
```

## Test Utilities

### Custom Render Function
```typescript
import { render } from '../../test/utils'

// Automatically includes all necessary providers and mocks
render(<Component />)
```

### Mock Functions
```typescript
import { vi } from 'vitest'

const mockOnClick = vi.fn()
render(<Button onClick={mockOnClick} />)

fireEvent.click(screen.getByRole('button'))
expect(mockOnClick).toHaveBeenCalled()
```

### Test Configuration
```typescript
import { testConfig } from '../../test/config'

// Use predefined test scenarios
const connectedState = testConfig.scenarios.connectionStates.connected
render(<WalletSection {...connectedState} />)
```

## Common Test Patterns

### 1. Component Rendering
```typescript
describe('ComponentName', () => {
  it('renders without crashing', () => {
    render(<ComponentName />)
    expect(screen.getByRole('main')).toBeInTheDocument()
  })
})
```

### 2. User Interactions
```typescript
it('handles user interaction', () => {
  const mockHandler = vi.fn()
  render(<Component onAction={mockHandler} />)
  
  fireEvent.click(screen.getByRole('button'))
  expect(mockHandler).toHaveBeenCalledWith(expectedValue)
})
```

### 3. Conditional Rendering
```typescript
it('renders different content based on props', () => {
  const { rerender } = render(<Component isConnected={false} />)
  expect(screen.queryByText(/connected/i)).not.toBeInTheDocument()
  
  rerender(<Component isConnected={true} />)
  expect(screen.getByText(/connected/i)).toBeInTheDocument()
})
```

### 4. Async Operations
```typescript
it('handles async operations', async () => {
  render(<AsyncComponent />)
  
  expect(screen.getByText(/loading/i)).toBeInTheDocument()
  
  await waitFor(() => {
    expect(screen.getByText(/loaded/i)).toBeInTheDocument()
  })
})
```

## Troubleshooting

### Common Issues

1. **JSX Parsing Error**: Ensure test files with JSX use `.tsx` extension
2. **Missing Props**: Check component interfaces and provide all required props
3. **Mock Issues**: Verify mocks are properly set up in `setup.ts`
4. **Type Errors**: Use proper TypeScript types and avoid `any`

### Debug Tips

1. **Use `screen.debug()`** to see the rendered DOM
2. **Check console output** for mock warnings
3. **Verify imports** are correct and paths are relative
4. **Test in isolation** to identify specific issues

## File Extensions

- **`.unit.ts`** - TypeScript unit tests without JSX
- **`.unit.tsx`** - TypeScript unit tests with JSX components
- **`.integration.ts`** - Integration tests
- **`.e2e.ts`** - End-to-end tests

## Coverage Goals

- **Statements**: > 80%
- **Branches**: > 75%
- **Functions**: > 80%
- **Lines**: > 80%

## Contributing

When adding new tests:

1. Follow the existing naming conventions
2. Use role-based selectors when possible
3. Avoid hard-coded text in assertions
4. Mock external dependencies properly
5. Write descriptive test names
6. Group related tests in describe blocks
7. Clean up after tests (handled automatically by vitest)

## Resources

- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Jest DOM Matchers](https://github.com/testing-library/jest-dom)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)