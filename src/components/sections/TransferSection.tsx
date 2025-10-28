import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Address } from '../../types/types';
import { toast } from 'react-toastify';
interface TransferSectionProps {
  address: Address;
  isConnected: boolean;
  balance: string | null;
  onTransfer: (recipient: string, amount: string, address: Address) => Promise<void>;
  isTransferring: boolean;
}

const TransferSection = ({
  address,
  isConnected,
  onTransfer,
  isTransferring,
}: TransferSectionProps) => {
  const { t } = useTranslation();
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [showTransferForm, setShowTransferForm] = useState(false);
  const [amountError, setAmountError] = useState('');

  const validateAmount = (value: string): string => {
    if (!value || value.trim() === '') {
      return t('main.transfer.validation.amountRequired');
    }
    
    const numValue = parseFloat(value);
    if (isNaN(numValue) || numValue <= 0) {
      return t('main.transfer.validation.amountGreaterThanZero');
    }
    
    return '';
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAmount(value);
    
    if (amountError) {
      setAmountError('');
    }
  };

  const handleAmountBlur = () => {
    const error = validateAmount(amount);
    setAmountError(error);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const amountValidationError = validateAmount(amount);
    if (amountValidationError) {
      setAmountError(amountValidationError);
      return;
    }
    
    if (!recipient || !amount || !isConnected) return;
    
    try {
      await onTransfer(recipient, amount, address);
      setRecipient('');
      setAmount('');
      setAmountError('');
    } catch (error) {
      toast.error(t('main.notifications.failedToTransfer', { error: error }));
    }
  };

  if (!isConnected) {
    return null;
  }

  return (
    <div className="mb-6" data-testid="transfer-section">
      <h3 className="text-lg sm:text-xl font-semibold text-white mb-6 text-center">{t('main.transfer.title')}</h3>
      {!showTransferForm ? (
        <div className="flex justify-center">
          <button
            onClick={() => setShowTransferForm(true)}
            className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/25 cursor-pointer"
          >
            <span className="flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
              {t('main.transfer.transfer')}
            </span>
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="recipient" className="block text-sm font-medium text-white mb-2">
                {t('main.transfer.recipient')}
              </label>
              <input
                type="text"
                id="recipient"
                data-testid="recipient-input"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder={t('main.transfer.placeholder.recipient')}
                className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label htmlFor="amount" className="block text-sm font-medium text-white mb-2">
                {t('main.transfer.amount')}
              </label>
              <input
                type="number"
                id="amount"
                data-testid="amount-input"
                value={amount}
                onChange={handleAmountChange}
                onBlur={handleAmountBlur}
                placeholder={t('main.transfer.placeholder.amount')}
                className={`w-full px-3 py-2 bg-slate-700/50 border rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:border-transparent ${
                  amountError 
                    ? 'border-red-500 focus:ring-red-500' 
                    : 'border-slate-600 focus:ring-blue-500'
                }`}
                min="0"
                step="0.000001"
                required
              />
              {amountError && (
                <p className="mt-1 text-sm text-red-400" data-testid="amount-error">
                  {amountError}
                </p>
              )}
            </div>
          </div>
          
          <div className="flex justify-center gap-4">
            <button
              type="button"
              onClick={() => setShowTransferForm(false)}
              className="bg-slate-600 hover:bg-slate-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200 cursor-pointer"
            >
              {t('main.transfer.cancel')}
            </button>
            <button
              type="submit"
              disabled={!recipient || !amount || isTransferring || !!amountError}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600/50 disabled:text-gray-400 disabled:cursor-not-allowed disabled:opacity-50 disabled:border disabled:border-gray-600/30 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-200"
            >
              {isTransferring ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>{t('main.transfer.sending')}</span>
                </div>
              ) : (
                t('main.transfer.send')
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default TransferSection;
