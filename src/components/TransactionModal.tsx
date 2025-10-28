
import { useTranslation } from 'react-i18next';
import { TransactionStatus } from '../types/types';

interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  transactionHash: string;
  status: TransactionStatus;
  errorMessage?: string;
  onGetTransactionDetails?: (txHash: string) => void;
  onGetTransactionReceipt?: (txHash: string) => void;
}

const TransactionModal = ({ isOpen, onClose, transactionHash, status, errorMessage, onGetTransactionDetails, onGetTransactionReceipt }: TransactionModalProps) => {
  const { t } = useTranslation();

  if (!isOpen) return null;

  const getStatusColor = () => {
    switch (status) {
      case TransactionStatus.PENDING:
        return 'text-yellow-500';
      case TransactionStatus.SUCCESS:
        return 'text-green-500';
      case TransactionStatus.FAILED:
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case TransactionStatus.PENDING:
        return '⏳';
      case TransactionStatus.SUCCESS:
        return '✅';
      case TransactionStatus.FAILED:
        return '❌';
      default:
        return '❓';
    }
  };

  const opScanUrl = `https://opscan.org/transactions/${transactionHash}`;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-slate-800 rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white" data-testid="transaction-modal-title">{t('main.transactions.modal.title')}</h3>
          <button
            onClick={onClose}
            className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-700/50 hover:bg-gray-600/70 text-gray-300 hover:text-white transition-all duration-200 hover:scale-105"
            aria-label="Close modal"
          >
            <svg 
              className="w-4 h-4" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M6 18L18 6M6 6l12 12" 
              />
            </svg>
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{getStatusIcon()}</span>
            <span className={`font-semibold ${getStatusColor()}`}>
              {t(`main.transactions.modal.status.${status}`)}
            </span>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              {t('main.transactions.modal.transactionHash')}
            </label>
            <div className="bg-slate-700 p-2 rounded text-sm font-mono text-white break-all">
              {transactionHash}
            </div>
          </div>

          {status === TransactionStatus.FAILED && errorMessage ? (
            <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-3">
              <p className="text-sm text-red-200 flex items-center gap-2">
                <span className="text-red-400">⚠️</span>
                {errorMessage}
              </p>
            </div>
          ) : (
            <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-3">
              <p className="text-sm text-blue-200 flex items-center gap-2">
                <span className="text-blue-400">ℹ️</span>
                {t('main.transactions.modal.opscanDelayMessage')}
              </p>
            </div>
          )}

          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              {status === TransactionStatus.FAILED ? (
                <button
                  disabled
                  className="flex-1 bg-gray-600/50 text-gray-400 px-4 py-2 rounded text-center cursor-not-allowed opacity-50 border border-gray-600/30"
                >
                  {t('main.transactions.modal.viewOnOpScan')}
                </button>
              ) : (
                <a
                  href={opScanUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-center transition-colors"
                >
                  {t('main.transactions.modal.viewOnOpScan')}
                </a>
              )}
              <button
                onClick={onClose}
                data-testid="close-modal-button"
                className="flex-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-md font-medium"
              >
                {t('main.transactions.modal.close')}
              </button>
            </div>
            
            {(onGetTransactionDetails || onGetTransactionReceipt) && (
              <div className="flex gap-2">
                {onGetTransactionDetails && (
                  <button
                    onClick={() => onGetTransactionDetails(transactionHash)}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition-colors"
                  >
                    {t('main.transactions.modal.getDetails')}
                  </button>
                )}
                {onGetTransactionReceipt && (
                  <button
                    onClick={() => onGetTransactionReceipt(transactionHash)}
                    className="flex-1 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded transition-colors"
                  >
                    {t('main.transactions.modal.getReceipt')}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionModal;
