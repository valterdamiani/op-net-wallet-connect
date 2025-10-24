import { useState, useEffect, useMemo, useRef } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from 'react-i18next';
import { WalletService } from '../services/walletService';
import type { WalletInfo, TransactionResult } from '../services/walletService';
import { OP20Service } from '../services/op20Service';
import type { TokenMetadata, TokenBalance } from '../services/op20Service';
import useEnvironmentValidation from '../hooks/useEnvironmentValidation';
import EnvironmentError from '../components/EnvironmentError';
import Header from '../components/Header';
import Footer from '../components/Footer';

const MainPage = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [walletInfo, setWalletInfo] = useState<WalletInfo | null>(null);
  const [tokenMetadata, setTokenMetadata] = useState<TokenMetadata | null>(null);
  const [tokenBalance, setTokenBalance] = useState<TokenBalance | null>(null);
  const [transactionResult, setTransactionResult] = useState<TransactionResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const metadataLoadedRef = useRef(false);

  const { t } = useTranslation();
  const { isValid, missingVariables } = useEnvironmentValidation();

  const walletService = useMemo(() => new WalletService(), []);
  const op20Service = useMemo(() => new OP20Service(), []);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  useEffect(() => {
    console.log('useEffect running, metadataLoadedRef.current:', metadataLoadedRef.current);
    if (metadataLoadedRef.current) return;
    metadataLoadedRef.current = true; 
    
    const loadTokenMetadata = async () => {
      console.log('Loading token metadata...');
      try {
        setLoading(true);
        const metadata = await op20Service.getTokenMetadata();
        setTokenMetadata(metadata);
        console.log('Token metadata loaded successfully');
        } catch (error) {
          console.error('Error loading token metadata:', error);
          toast.error(t('main.notifications.failedToLoadMetadata'));
      } finally {
        setLoading(false);
      }
    };

    loadTokenMetadata();
  }, [op20Service]);

  const connectWallet = async () => {
    try {
      setLoading(true);
      
      const walletInfo = await walletService.connect();
      setWalletInfo(walletInfo);
      setIsConnected(true);
      
          await loadUserTokenData(walletInfo.address);
          toast.success(t('main.notifications.walletConnected'));
        } catch (error) {
          console.error('Error connecting wallet:', error);
          toast.error(t('main.notifications.failedToConnect'));
    } finally {
      setLoading(false);
    }
  };

  const disconnectWallet = async () => {
    try {
      await walletService.disconnect();
      setIsConnected(false);
      setWalletInfo(null);
          setTokenBalance(null);
          setTransactionResult(null);
          toast.success(t('main.notifications.walletDisconnected'));
        } catch (error) {
          console.error('Error disconnecting wallet:', error);
          toast.error(t('main.notifications.failedToDisconnect'));
    }
  };

  const loadUserTokenData = async (address: string) => {
    try {
        const balance = await op20Service.getTokenBalance(address);
        setTokenBalance(balance);
        toast.success(t('main.notifications.tokenBalanceLoaded'));
      } catch (error) {
        console.error('Error loading token data:', error);
        toast.error(t('main.notifications.failedToLoadBalance'));
    }
  };

  const handleApprove = async () => {
    if (!walletInfo) return;
    
    try {
      setLoading(true);
      
      const amount = '1000000000000000000'; // 1 token (18 decimals)
      const txHash = await op20Service.approveTokens(walletInfo.address, amount);
      
      setTransactionResult({
        hash: txHash,
        status: 'pending',
      });
      
          toast.success(t('main.notifications.tokensApproved', { hash: txHash.slice(0, 10) }));
      
      await loadUserTokenData(walletInfo.address);
        } catch (error) {
          console.error('Error approving tokens:', error);
          toast.error(t('main.notifications.failedToApprove'));
    } finally {
      setLoading(false);
    }
  };

  const handleTransfer = async () => {
    if (!walletInfo) return;
    
    try {
      setLoading(true);
      
      const toAddress = '0x742d35Cc6634C0532925a3b8D0C0C2C0C0C0C0C0'; // Example recipient
      const amount = '100000000000000000'; 
      const txHash = await op20Service.transferTokens(walletInfo.address, toAddress, amount);
      
      setTransactionResult({
        hash: txHash,
        status: 'pending',
      });
      
          toast.success(t('main.notifications.tokensTransferred', { hash: txHash.slice(0, 10) }));
      
      await loadUserTokenData(walletInfo.address);
        } catch (error) {
          console.error('Error transferring tokens:', error);
          toast.error(t('main.notifications.failedToTransfer'));
    } finally {
      setLoading(false);
    }
  };

  if (!isValid) {
    return <EnvironmentError missingVariables={missingVariables} />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 text-white">
      <Header />

      <main className="flex-1">
        <section className="py-8 sm:py-16 text-center">
          <div className="max-w-6xl mx-auto px-4 sm:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                {t('main.title')}
              </h2>
              <p className="text-lg sm:text-xl text-white/90 mb-8 sm:mb-12 leading-relaxed">
                {t('main.subtitle')}
              </p>
              

              {tokenMetadata && (
                <div className="bg-slate-800/95 backdrop-blur-md p-4 sm:p-6 rounded-2xl shadow-2xl max-w-4xl mx-auto border border-slate-700 mb-8">
                  <h3 className="text-lg sm:text-xl font-semibold text-white mb-4">{t('main.tokenInfo.title')}</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <span className="text-slate-300 text-sm">{t('main.tokenInfo.name')}</span>
                      <p className="text-cyan-400 font-mono">{tokenMetadata.name}</p>
                    </div>
                    <div>
                      <span className="text-slate-300 text-sm">{t('main.tokenInfo.symbol')}</span>
                      <p className="text-cyan-400 font-mono">{tokenMetadata.symbol}</p>
                    </div>
                    <div>
                      <span className="text-slate-300 text-sm">{t('main.tokenInfo.decimals')}</span>
                      <p className="text-cyan-400 font-mono">{tokenMetadata.decimals}</p>
                    </div>
                    <div>
                      <span className="text-slate-300 text-sm">{t('main.tokenInfo.maxSupply')}</span>
                      <p className="text-cyan-400 font-mono">{tokenMetadata.maxSupply}</p>
                    </div>
                    <div>
                      <span className="text-slate-300 text-sm">{t('main.tokenInfo.totalSupply')}</span>
                      <p className="text-cyan-400 font-mono">{tokenMetadata.totalSupply}</p>
                    </div>
                    <div>
                      <span className="text-slate-300 text-sm">{t('main.tokenInfo.address')}</span>
                      <p className="text-cyan-400 font-mono text-xs">{op20Service.getTokenAddress()}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-8">
                {!isConnected ? (
                  <button 
                    className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white border-0 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-xl cursor-pointer transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 disabled:opacity-50 w-full sm:w-auto"
                    onClick={connectWallet}
                    disabled={loading}
                  >
                    {loading ? t('main.wallet.connecting') : t('main.wallet.connect')}
                  </button>
                ) : (
                  <div className="bg-slate-800/95 backdrop-blur-md p-4 sm:p-8 rounded-2xl shadow-2xl max-w-4xl mx-auto border border-slate-700">
                    <div className="flex items-center gap-2 mb-6">
                      <span className="w-3 h-3 rounded-full bg-green-500 shadow-lg shadow-green-500/50"></span>
                      <span className="font-semibold text-green-400">{t('main.wallet.connected')}</span>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6">
                      <div>
                        <span className="text-slate-300 text-sm">{t('main.wallet.account')}</span>
                        <p className="text-cyan-400 font-mono text-sm">{walletInfo?.address}</p>
                      </div>
                      <div>
                        <span className="text-slate-300 text-sm">{t('main.wallet.network')}</span>
                        <p className="text-cyan-400 font-mono text-sm">{walletInfo?.networkName} (Chain ID: {walletInfo?.chainId})</p>
                      </div>
                    </div>

                    {tokenBalance && (
                      <div className="bg-slate-700/50 p-6 rounded-lg mb-6">
                        <h4 className="text-lg font-semibold text-white mb-4">{t('main.wallet.yourTokenData')}</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <span className="text-slate-300 text-sm">{t('main.wallet.balance')}</span>
                            <p className="text-cyan-400 font-mono">{tokenBalance.balance} {tokenMetadata?.symbol}</p>
                          </div>
                          <div>
                            <span className="text-slate-300 text-sm">{t('main.wallet.allowance')}</span>
                            <p className="text-cyan-400 font-mono">{tokenBalance.allowance} {tokenMetadata?.symbol}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6">
                      <button
                        onClick={handleApprove}
                        disabled={loading}
                        className="bg-green-600 text-white px-4 sm:px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:opacity-50 text-sm sm:text-base"
                      >
                        {loading ? t('main.transactions.processing') : t('main.transactions.approve')}
                      </button>
                      <button
                        onClick={handleTransfer}
                        disabled={loading}
                        className="bg-blue-600 text-white px-4 sm:px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 text-sm sm:text-base"
                      >
                        {loading ? t('main.transactions.processing') : t('main.transactions.transfer')}
                      </button>
                    </div>

                    {transactionResult && (
                      <div className="bg-slate-700/50 p-4 rounded-lg mb-6">
                        <h4 className="text-white font-semibold mb-2">{t('main.transactions.result')}</h4>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-slate-300">{t('main.transactions.status')}</span>
                          <span className={`px-2 py-1 rounded text-xs font-semibold ${
                            transactionResult.status === 'pending' ? 'bg-yellow-600 text-yellow-100' :
                            transactionResult.status === 'success' ? 'bg-green-600 text-green-100' :
                            'bg-red-600 text-red-100'
                          }`}>
                            {transactionResult.status.toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <span className="text-slate-300 text-sm">{t('main.transactions.hash')}</span>
                          <p className="text-cyan-400 font-mono text-xs break-all">{transactionResult.hash}</p>
                        </div>
                      </div>
                    )}
                    
                    <button 
                      className="bg-red-600 text-white border-0 px-6 py-3 text-sm font-semibold rounded-lg cursor-pointer transition-all duration-300 w-full hover:bg-red-700 hover:-translate-y-0.5"
                      onClick={disconnectWallet}
                    >
                      {t('main.wallet.disconnect')}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-slate-800/30 backdrop-blur-md" id="features">
          <div className="max-w-6xl mx-auto px-8">
            <h3 className="text-4xl font-bold text-white text-center mb-12">{t('features.title')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-slate-800/95 backdrop-blur-md p-8 rounded-2xl text-center shadow-xl hover:-translate-y-2 transition-transform duration-300 border border-slate-700">
                <div className="text-5xl mb-4">🔗</div>
                <h4 className="text-2xl font-semibold text-white mb-4">{t('features.walletConnect.title')}</h4>
                <p className="text-slate-300 leading-relaxed">
                  {t('features.walletConnect.description')}
                </p>
              </div>
              <div className="bg-slate-800/95 backdrop-blur-md p-8 rounded-2xl text-center shadow-xl hover:-translate-y-2 transition-transform duration-300 border border-slate-700">
                <div className="text-5xl mb-4">📊</div>
                <h4 className="text-2xl font-semibold text-white mb-4">{t('features.tokenMetadata.title')}</h4>
                <p className="text-slate-300 leading-relaxed">
                  {t('features.tokenMetadata.description')}
                </p>
              </div>
              <div className="bg-slate-800/95 backdrop-blur-md p-8 rounded-2xl text-center shadow-xl hover:-translate-y-2 transition-transform duration-300 border border-slate-700">
                <div className="text-5xl mb-4">💰</div>
                <h4 className="text-2xl font-semibold text-white mb-4">{t('features.balanceAllowance.title')}</h4>
                <p className="text-slate-300 leading-relaxed">
                  {t('features.balanceAllowance.description')}
                </p>
              </div>
              <div className="bg-slate-800/95 backdrop-blur-md p-8 rounded-2xl text-center shadow-xl hover:-translate-y-2 transition-transform duration-300 border border-slate-700">
                <div className="text-5xl mb-4">⚡</div>
                <h4 className="text-2xl font-semibold text-white mb-4">{t('features.transactions.title')}</h4>
                <p className="text-slate-300 leading-relaxed">
                  {t('features.transactions.description')}
                </p>
              </div>
              <div className="bg-slate-800/95 backdrop-blur-md p-8 rounded-2xl text-center shadow-xl hover:-translate-y-2 transition-transform duration-300 border border-slate-700">
                <div className="text-5xl mb-4">🌐</div>
                <h4 className="text-2xl font-semibold text-white mb-4">{t('features.opnetTestnet.title')}</h4>
                <p className="text-slate-300 leading-relaxed">
                  {t('features.opnetTestnet.description')}
                </p>
              </div>
              <div className="bg-slate-800/95 backdrop-blur-md p-8 rounded-2xl text-center shadow-xl hover:-translate-y-2 transition-transform duration-300 border border-slate-700">
                <div className="text-5xl mb-4">🛡️</div>
                <h4 className="text-2xl font-semibold text-white mb-4">{t('features.secure.title')}</h4>
                <p className="text-slate-300 leading-relaxed">
                  {t('features.secure.description')}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16" id="about">
          <div className="max-w-6xl mx-auto px-8">
            <h3 className="text-4xl font-bold text-white text-center mb-12">{t('about.title')}</h3>
            <div className="max-w-4xl mx-auto">
              <p className="text-lg text-white/90 leading-relaxed mb-8">
                {t('about.description')}
              </p>
              <div className="bg-slate-800/50 backdrop-blur-md p-8 rounded-xl border border-slate-700">
                <div className="flex justify-between items-center py-3 border-b border-slate-600 last:border-b-0">
                  <span className="font-semibold text-white">{t('about.network')}</span>
                  <span className="text-slate-300 font-mono">{t('about.networkValue')}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-slate-600 last:border-b-0">
                  <span className="font-semibold text-white">{t('about.chainId')}</span>
                  <span className="text-slate-300 font-mono">{t('about.chainIdValue')}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-slate-600 last:border-b-0">
                  <span className="font-semibold text-white">{t('about.rpcUrl')}</span>
                  <span className="text-slate-300 font-mono">{t('about.rpcUrlValue')}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-slate-600 last:border-b-0">
                  <span className="font-semibold text-white">{t('about.tokenStandard')}</span>
                  <span className="text-slate-300 font-mono">{t('about.tokenStandardValue')}</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
          <ToastContainer
            position={isMobile ? "top-center" : "bottom-right"}
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
            toastClassName="bg-slate-800 border border-slate-600 text-white"
            className={isMobile ? "!top-4 !left-1/2 !transform !-translate-x-1/2 !w-[calc(100%-2rem)] !max-w-sm" : "!bottom-4 !right-1"}
          />
    </div>
  );
};

export default MainPage;
