import React, { useState } from 'react';
import OpWalletIcon from '../assets/op-wallet-icon.svg';

const MainPage: React.FC = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string>('');

  const connectWallet = async () => {
    setIsConnected(true);
    setWalletAddress('0x1234567890123456789012345678901234567890');
  };

  const disconnectWallet = () => {
    setIsConnected(false);
    setWalletAddress('');
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 text-white">
      <header className="bg-slate-900/95 backdrop-blur-md border-b border-slate-700/50 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img src={OpWalletIcon} alt="OP Net Wallet" className="w-8 h-8" />
            <h1 className="text-2xl font-bold text-cyan-400">OP Net Wallet Connect</h1>
          </div>
          <nav className="flex gap-8">
            <a href="#home" className="text-slate-300 font-medium hover:text-cyan-400 transition-colors">Home</a>
            <a href="#features" className="text-slate-300 font-medium hover:text-cyan-400 transition-colors">Features</a>
            <a href="#about" className="text-slate-300 font-medium hover:text-cyan-400 transition-colors">About</a>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <section className="py-16 text-center">
          <div className="max-w-6xl mx-auto px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-5xl font-bold text-white mb-6 leading-tight">
                Connect Your Wallet to Optimism Network
              </h2>
              <p className="text-xl text-white/90 mb-12 leading-relaxed">
                Seamlessly connect your MetaMask wallet to the Optimism network 
                and start interacting with decentralized applications.
              </p>
              
              <div className="mt-8">
                {!isConnected ? (
                  <button 
                    className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white border-0 px-8 py-4 text-lg font-semibold rounded-xl cursor-pointer transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
                    onClick={connectWallet}
                  >
                    Connect Wallet
                  </button>
                ) : (
                  <div className="bg-slate-800/95 backdrop-blur-md p-8 rounded-2xl shadow-2xl max-w-md mx-auto border border-slate-700">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="w-3 h-3 rounded-full bg-green-500 shadow-lg shadow-green-500/50"></span>
                      <span className="font-semibold text-green-400">Connected</span>
                    </div>
                    <div className="flex flex-col gap-2 mb-6">
                      <span className="text-sm text-slate-300 font-medium">Address:</span>
                      <span className="font-mono text-base text-slate-200 bg-slate-700 px-3 py-2 rounded-lg border border-slate-600">
                        {formatAddress(walletAddress)}
                      </span>
                    </div>
                    <button 
                      className="bg-red-600 text-white border-0 px-6 py-3 text-sm font-semibold rounded-lg cursor-pointer transition-all duration-300 w-full hover:bg-red-700 hover:-translate-y-0.5"
                      onClick={disconnectWallet}
                    >
                      Disconnect
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-slate-800/30 backdrop-blur-md" id="features">
          <div className="max-w-6xl mx-auto px-8">
            <h3 className="text-4xl font-bold text-white text-center mb-12">Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-slate-800/95 backdrop-blur-md p-8 rounded-2xl text-center shadow-xl hover:-translate-y-2 transition-transform duration-300 border border-slate-700">
                <div className="text-5xl mb-4">🔗</div>
                <h4 className="text-2xl font-semibold text-white mb-4">Easy Connection</h4>
                <p className="text-slate-300 leading-relaxed">
                  Connect your MetaMask wallet with just one click
                </p>
              </div>
              <div className="bg-slate-800/95 backdrop-blur-md p-8 rounded-2xl text-center shadow-xl hover:-translate-y-2 transition-transform duration-300 border border-slate-700">
                <div className="text-5xl mb-4">⚡</div>
                <h4 className="text-2xl font-semibold text-white mb-4">Fast Transactions</h4>
                <p className="text-slate-300 leading-relaxed">
                  Enjoy fast and low-cost transactions on Optimism
                </p>
              </div>
              <div className="bg-slate-800/95 backdrop-blur-md p-8 rounded-2xl text-center shadow-xl hover:-translate-y-2 transition-transform duration-300 border border-slate-700">
                <div className="text-5xl mb-4">🛡️</div>
                <h4 className="text-2xl font-semibold text-white mb-4">Secure</h4>
                <p className="text-slate-300 leading-relaxed">
                  Your private keys never leave your wallet
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16" id="about">
          <div className="max-w-6xl mx-auto px-8">
            <h3 className="text-4xl font-bold text-white text-center mb-12">About Optimism</h3>
            <div className="max-w-4xl mx-auto">
              <p className="text-lg text-white/90 leading-relaxed mb-8">
                Optimism is a Layer 2 scaling solution for Ethereum that provides 
                fast, cheap, and secure transactions. Built on top of Ethereum's 
                security model, Optimism enables developers to build scalable 
                applications with minimal changes to their existing code.
              </p>
              <div className="bg-slate-800/50 backdrop-blur-md p-8 rounded-xl border border-slate-700">
                <div className="flex justify-between items-center py-3 border-b border-slate-600 last:border-b-0">
                  <span className="font-semibold text-white">Network:</span>
                  <span className="text-slate-300 font-mono">Optimism Mainnet</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-slate-600 last:border-b-0">
                  <span className="font-semibold text-white">Chain ID:</span>
                  <span className="text-slate-300 font-mono">10</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-slate-600 last:border-b-0">
                  <span className="font-semibold text-white">RPC URL:</span>
                  <span className="text-slate-300 font-mono">https://mainnet.optimism.io</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-slate-900/50 py-8 text-center">
        <div className="max-w-6xl mx-auto px-8">
          <p className="text-slate-400">
            © 2025 OP_Net Wallet Connect. Built with React and Vite.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default MainPage;
