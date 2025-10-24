import { useTranslation } from 'react-i18next';
import LabelValue from '../LabelValue';
import LoadingButton from '../LoadingButton';
import type { WalletInfo, TransactionResult } from '../../services/walletService';
import type { TokenBalance, TokenMetadata } from '../../services/op20Service';

interface WalletSectionProps {
  isConnected: boolean;
  walletInfo: WalletInfo | null;
  tokenBalance: TokenBalance | null;
  tokenMetadata: TokenMetadata | null;
  transactionResult: TransactionResult | null;
  connectWallet: () => void;
  disconnectWallet: () => void;
  handleApprove: () => void;
  handleTransfer: () => void;
  walletLoading: boolean;
  transactionLoading: boolean;
}

const WalletSection = ({
  isConnected,
  walletInfo,
  tokenBalance,
  tokenMetadata,
  transactionResult,
  connectWallet,
  disconnectWallet,
  handleApprove,
  handleTransfer,
  walletLoading,
  transactionLoading,
}: WalletSectionProps) => {
  const { t } = useTranslation();

  return (
    <div className="mt-8">
      {!isConnected ? (
        <LoadingButton
          onClick={connectWallet}
          loading={walletLoading}
          className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white w-full sm:w-auto"
        >
          {t('main.wallet.connect')}
        </LoadingButton>
      ) : (
        <div className="bg-slate-800/95 backdrop-blur-md p-4 sm:p-8 rounded-2xl shadow-2xl max-w-4xl mx-auto border border-slate-700">
          <div className="flex items-center gap-2 mb-6">
            <span className="w-3 h-3 rounded-full bg-green-500 shadow-lg shadow-green-500/50"></span>
            <span className="font-semibold text-green-400">{t('main.wallet.connected')}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6">
            <LabelValue label={t('main.wallet.account')} value={walletInfo?.address || ''} valueSize="sm" />
            <LabelValue label={t('main.wallet.network')} value={`${walletInfo?.networkName} (Chain ID: ${walletInfo?.chainId})`} valueSize="sm" />
          </div>

          {tokenBalance && (
            <div className="bg-slate-700/50 p-6 rounded-lg mb-6">
              <h4 className="text-lg font-semibold text-white mb-4">{t('main.wallet.yourTokenData')}</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <LabelValue label={t('main.wallet.balance')} value={`${tokenBalance.balance} ${tokenMetadata?.symbol}`} />
                <LabelValue label={t('main.wallet.allowance')} value={`${tokenBalance.allowance} ${tokenMetadata?.symbol}`} />
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6">
            <LoadingButton
              onClick={handleApprove}
              loading={transactionLoading}
              className="bg-green-600 text-white hover:bg-green-700"
            >
              {t('main.transactions.approve')}
            </LoadingButton>
            <LoadingButton
              onClick={handleTransfer}
              loading={transactionLoading}
              className="bg-blue-600 text-white hover:bg-blue-700"
            >
              {t('main.transactions.transfer')}
            </LoadingButton>
          </div>

          {transactionResult && (
            <div className="bg-slate-700/50 p-4 rounded-lg mb-6">
              <h4 className="text-white font-semibold mb-2">{t('main.transactions.result')}</h4>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-slate-300">{t('main.transactions.status')}</span>
                <span className={`px-2 py-1 rounded text-xs font-semibold ${transactionResult.status === 'pending' ? 'bg-yellow-600 text-yellow-100' :
                    transactionResult.status === 'success' ? 'bg-green-600 text-green-100' :
                      'bg-red-600 text-red-100'
                  }`}>
                  {transactionResult.status.toUpperCase()}
                </span>
              </div>
              <LabelValue label={t('main.transactions.hash')} value={transactionResult.hash} valueSize="xs" valueBreak />
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
  );
};

export default WalletSection;
