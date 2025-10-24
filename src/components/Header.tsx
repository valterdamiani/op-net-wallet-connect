import { useState } from 'react';
import OpWalletIcon from '../assets/op-wallet-icon.svg';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-slate-900/95 backdrop-blur-md border-b border-slate-700/50 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <img src={OpWalletIcon} alt="OP Net Wallet" className="w-8 h-8" />
          <h1 className="text-xl sm:text-2xl font-bold text-cyan-400">OP Net Wallet Connect</h1>
        </div>
        
        <nav className="hidden md:flex gap-8">
          <a href="#home" className="text-slate-300 font-medium hover:text-cyan-400 transition-colors">Home</a>
          <a href="#features" className="text-slate-300 font-medium hover:text-cyan-400 transition-colors">Features</a>
          <a href="#about" className="text-slate-300 font-medium hover:text-cyan-400 transition-colors">About</a>
        </nav>

        <button
          className="md:hidden flex flex-col gap-1 p-2 text-slate-300 hover:text-cyan-400 transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          <span className={`w-6 h-0.5 bg-current transition-transform ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
          <span className={`w-6 h-0.5 bg-current transition-opacity ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`w-6 h-0.5 bg-current transition-transform ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-slate-800/95 backdrop-blur-md border-t border-slate-700/50">
          <nav className="flex flex-col py-4">
            <a 
              href="#home" 
              className="px-6 py-3 text-slate-300 font-medium hover:text-cyan-400 hover:bg-slate-700/50 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </a>
            <a 
              href="#features" 
              className="px-6 py-3 text-slate-300 font-medium hover:text-cyan-400 hover:bg-slate-700/50 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Features
            </a>
            <a 
              href="#about" 
              className="px-6 py-3 text-slate-300 font-medium hover:text-cyan-400 hover:bg-slate-700/50 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
