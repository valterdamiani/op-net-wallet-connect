# OP Net Wallet Connect

A React application for connecting wallets. Built with TypeScript, Vite, and Tailwind CSS.

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- MetaMask browser extension

### Installation & Running

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🔗 Token & Network

**Network**: Optimism Mainnet
- **Chain ID**: 10
- **RPC URL**: https://mainnet.optimism.io
- **Native Token**: ETH (Ethereum)
- **Gas Token**: ETH

## 🎯 Features

- **Wallet Connection**: One-click MetaMask integration
- **Optimism Network**: Built specifically for Optimism Layer 2
- **Modern UI**: Dark theme with glass-morphism effects
- **Responsive Design**: Works on desktop and mobile
- **TypeScript**: Full type safety and better development experience

## 🛠️ Tech Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **ESLint** - Code linting

## 📋 Assumptions

1. **MetaMask Required**: Users must have MetaMask installed
2. **Optimism Network**: Application is designed for Optimism Layer 2
3. **Modern Browser**: Requires modern browser with Web3 support
4. **Wallet Connection**: Users understand wallet connection process
5. **Network Switching**: Users can manually switch to Optimism network in MetaMask

## 🔧 Development

```bash
# Lint code
npm run lint

# Type check
npx tsc --noEmit
```

## 📱 Usage

1. Open the application in your browser
2. Click "Connect Wallet" button
3. Approve the connection in MetaMask
4. Your wallet address will be displayed
5. Switch to Optimism network in MetaMask if needed

## 🎨 Customization

The application uses Tailwind CSS for styling. Key color schemes can be modified in the component files:
- Dark theme with slate colors
- Cyan accent colors
- Glass-morphism effects

## 📄 License

GNU General Public License v3.0 (GPL-3.0) - see LICENSE file for details.