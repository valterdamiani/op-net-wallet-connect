# OP Net Wallet Connect

A React application that connects wallets using @btc-vision/walletconnect and interacts with OP_20 tokens on the OpNet blockchain. Built with TypeScript, Vite, and Tailwind CSS.

## 🎯 Task Objectives

✅ **Connect wallet via @btc-vision/walletconnect**  
✅ **Display account and network information**  
✅ **Show token metadata when disconnected** (name, symbol, decimals, maxSupply, totalSupply)  
✅ **Show balance and allowance when connected**  
✅ **Execute approve/transfer transactions with tx hash/status**  
✅ **Use OpNet test network with known OP_20 token**

## 🚀 Quick Start

### Prerequisites
- **Node.js v18+** (recommended: v18.17.0 or higher)
- OpNet wallet (https://opnet.org)
- WalletConnect Project ID from [WalletConnect Cloud](https://cloud.walletconnect.com/)

### Installation & Setup

```bash
# Clone the repository
git clone https://github.com/valterdamiani/op-net-wallet-connect.git
cd op-net-wallet-connect

# Install dependencies
npm install

# Set up environment variables
cp env.example .env
# Edit .env with your actual token addresses and WalletConnect project ID

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build

# Code Quality
npm run lint         # Run ESLint checks
npm run lint:fix     # Fix ESLint issues automatically

# Type Checking
npx tsc --noEmit     # Type check without emitting files
```

## 🔧 Environment Variables

Create a `.env` file in the root directory with the following variables:

```bash
# OpNet Test Network Configuration
VITE_OPNET_RPC_URL=regtest.opnet.org
VITE_OPNET_CHAIN_ID=12345
VITE_OPNET_CHAIN_NAME=OpNet Testnet
VITE_OPNET_CURRENCY_NAME=OpNet
VITE_OPNET_CURRENCY_SYMBOL=OP
VITE_OPNET_CURRENCY_DECIMALS=18

# OP_20 Token Configuration
# Primary token address
VITE_OP20_TOKEN_ADDRESS=your-token-address-here
# Spender address for allowance checks
VITE_OP20_SPENDER_ADDRESS=your-spender-address-here

# Test Tokens on OpNet Testnet
# MOTO Token
VITE_MOTO_TOKEN=your-moto-token-address-here

# ODYSSEY Token
VITE_ODYSSEY_TOKEN=your-odyssey-token-address-here

# PILL Token
VITE_PILL_TOKEN=your-pill-token-address-here

# WalletConnect Configuration
# Get your project ID from https://cloud.walletconnect.com/
VITE_WALLETCONNECT_PROJECT_ID=your-walletconnect-project-id

# Application Configuration
VITE_APP_NAME=OP Net Wallet Connect
VITE_APP_DESCRIPTION=Connect to OpNet blockchain and interact with OP_20 tokens
VITE_APP_URL=https://opnet.org
VITE_APP_ICON=https://opnet.org/icon.png
```

### Security Notes
- **Never commit secrets**: The `.env` file is gitignored
- **Use .env.example**: Template provided for required keys
- **WalletConnect Project ID**: Get from [WalletConnect Cloud](https://cloud.walletconnect.com/)
- **Test Network Only**: This app is configured for OpNet testnet
- **Token Addresses**: Keep actual token addresses in environment variables

## 🎯 Features

### Disconnected State
- **Token Metadata Display**: Shows OP_20 token name, symbol, decimals, maxSupply, totalSupply
- **Network Information**: Displays OpNet test network details
- **Token Contract Address**: Shows the configured OP_20 token address

### Connected State
- **Account & Network**: Displays connected wallet address and network information
- **Token Balance**: Shows user's OP_20 token balance
- **Allowance**: Displays allowance for configured spender address
- **Transaction Actions**: Approve and transfer token functionality
- **Transaction Results**: Shows transaction hash and status

## 🛠️ Tech Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **@btc-vision/walletconnect** - Wallet connection
- **ESLint** - Code linting

## 📁 Project Structure

```
src/
├── components/          # React components
├── services/           # Business logic
│   ├── walletService.ts    # WalletConnect integration
│   └── op20Service.ts      # OP_20 token interactions
├── assets/             # Static assets
│   └── op-wallet-icon.svg  # Custom wallet icon
└── pages/              # Page components
    └── MainPage.tsx        # Main application page
```

## 🔧 Development

### Code Quality & Linting

This project uses **ESLint Standard Configuration** for consistent code quality:

```bash
# Run ESLint checks
npm run lint

# Fix ESLint issues automatically
npm run lint:fix

# Type check without emitting files
npx tsc --noEmit
```

**ESLint Configuration:**
- Standard TypeScript rules
- React-specific linting
- Import/export validation
- Unused variable detection
- Consistent code formatting

### Development Workflow

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📱 Usage

1. **View Token Metadata**: Token information is displayed when disconnected
2. **Connect Wallet**: Click "Connect Wallet" to establish connection
3. **View Balance**: See your token balance and allowance when connected
4. **Execute Transactions**: Use "Approve Tokens" or "Transfer Tokens" buttons
5. **Monitor Results**: View transaction hash and status

## 📁 Repository Details

**Repository URL**: `https://github.com/valterdamiani/op-net-wallet-connect`

## 🛠️ OpNet Utilities & Resources

### Network Resources
- **RPC URL**: `regtest.opnet.org`
- **Faucet**: [https://faucet.opnet.org](https://faucet.opnet.org) - Get test tokens
- **Block Explorer**: [https://opscan.org](https://opscan.org) - View transactions and blocks

### Development Tools
- **WalletConnect**: [@btc-vision/walletconnect](https://www.npmjs.com/package/@btc-vision/walletconnect?activeTab=readme) - Wallet connection library
- **Documentation**: [https://docs.opnet.org](https://docs.opnet.org) - Official OpNet documentation

### Getting Started with OpNet
1. **Get Test Tokens**: Visit the faucet to get test OP tokens
2. **Configure Wallet**: Add OpNet network to your wallet
3. **Explore Transactions**: Use OP_SCAN to view your transactions
4. **Read Documentation**: Check the official docs for detailed information

## 📹 Demo Recording

**Demo Video**: `/docs/demo.mp4`

The demo showcases:
1. Token metadata display when disconnected
2. Wallet connection process
3. Balance and allowance display
4. Transaction execution (approve/transfer)
5. Transaction result display
6. Error handling scenarios

## 📄 License

GNU General Public License v3.0 (GPL-3.0) - see LICENSE file for details.