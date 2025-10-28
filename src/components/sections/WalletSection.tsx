import { useTranslation } from 'react-i18next';
import UserTokenData from '../UserTokenData';
import TransferSection from './TransferSection';
import { ConnectionState, Address } from '../../types/types';
import { ConnectedData } from '../../services/op20Service';

interface WalletSectionProps {
  isConnected: boolean;
  connectionState: ConnectionState;
  address: Address;
  connectedData: ConnectedData | null;
  disconnectWallet: () => void;
  handleConnectWallet: () => void;
  onTransfer: (recipient: string, amount: string, address: Address) => Promise<void>;
  isTransferring: boolean;
}

const WalletSection = ({
  isConnected,
  connectionState,
  address,
  connectedData,
  isTransferring,
  disconnectWallet,
  handleConnectWallet,
  onTransfer,
}: WalletSectionProps) => {
  const { t } = useTranslation();

  return (
    <div className="mt-8">
      {connectionState === ConnectionState.CONNECTING && (
        <div className="bg-slate-800/95 backdrop-blur-md p-6 sm:p-8 rounded-2xl shadow-2xl max-w-4xl mx-auto border border-slate-700 mb-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-500"></div>
            </div>
            <h3 className="text-xl sm:text-2xl font-semibold text-white mb-4">{t('main.wallet.connectingTitle')}</h3>
            <p className="text-slate-300 mb-6 text-sm sm:text-base">{t('main.wallet.connectingMessage')}</p>
          </div>
        </div>
      )}

      {isConnected && connectionState === ConnectionState.CONNECTED && (
        <div className="bg-slate-800/95 backdrop-blur-md p-6 sm:p-8 rounded-2xl shadow-2xl max-w-4xl mx-auto border border-slate-700 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-green-500 shadow-lg shadow-green-500/50"></span>
              <span className="font-semibold text-green-400">{t('main.wallet.connected')}</span>
            </div>
            <button
              className="bg-red-600 text-white border-0 px-6 py-3 text-sm font-semibold rounded-lg cursor-pointer transition-all duration-300 hover:bg-red-700 hover:-translate-y-0.5"
              onClick={disconnectWallet}
            >
              {t('main.wallet.disconnect')}
            </button>
          </div>

            {connectedData && (
              <UserTokenData
                address={address}
                connectedData={connectedData}
                isConnected={isConnected}
              />
            )}
          
          <TransferSection
            address={address}
            isConnected={isConnected}
            balance={connectedData?.userBalance || null}
            onTransfer={onTransfer}
            isTransferring={isTransferring}
          />
        </div>
      )}
      {connectionState === ConnectionState.DISCONNECTED && (
        <div className="bg-slate-800/95 backdrop-blur-md p-6 sm:p-8 rounded-2xl shadow-2xl max-w-4xl mx-auto border border-slate-700 mb-8">
          <div className="text-center">
            <h3 className="text-xl sm:text-2xl font-semibold text-white mb-4">{t('main.wallet.connectTitle')}</h3>
            <p className="text-slate-300 mb-6 text-sm sm:text-base">{t('main.wallet.connectMessage')}</p>
            <button
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/25 w-full sm:w-auto cursor-pointer"
              onClick={handleConnectWallet}
            >
              <span className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                {t('main.wallet.connect')}
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WalletSection;
