import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TransactionType, TransactionStatus } from '../types/transaction';

interface Transaction {
  id: string;
  type: TransactionType;
  status: TransactionStatus;
  timestamp: Date;
  amount?: string;
  recipient?: string;
  spender?: string;
}

interface TransactionAccordionProps {
  transactions: Transaction[];
}

const TransactionAccordion = ({ transactions }: TransactionAccordionProps) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const getStatusColor = (status: TransactionStatus) => {
    switch (status) {
      case TransactionStatus.SUCCESS:
        return 'text-green-400';
      case TransactionStatus.FAILED:
        return 'text-red-400';
      case TransactionStatus.PENDING:
        return 'text-yellow-400';
      default:
        return 'text-slate-400';
    }
  };

  const getStatusIcon = (status: TransactionStatus) => {
    switch (status) {
      case TransactionStatus.SUCCESS:
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        );
      case TransactionStatus.FAILED:
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        );
      case TransactionStatus.PENDING:
        return (
          <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        );
      default:
        return null;
    }
  };

  const formatTransactionId = (id: string) => {
    return `${id.slice(0, 8)}...${id.slice(-8)}`;
  };

  const formatTimestamp = (timestamp: Date) => {
    return timestamp.toLocaleString();
  };

  return (
    <div className="bg-slate-700/50 p-4 rounded-lg mb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full text-left"
      >
        <h4 className="text-lg font-semibold text-white">
          {t('main.transactions.title')} ({transactions.length})
        </h4>
        <svg
          className={`w-5 h-5 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="mt-4 space-y-3">
          {transactions.length === 0 ? (
            <p className="text-slate-400 text-center py-4">
              {t('main.transactions.noTransactions')}
            </p>
          ) : (
            transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="bg-slate-600/50 p-3 rounded-lg border border-slate-500/30"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className={`font-semibold ${getStatusColor(transaction.status)}`}>
                      {transaction.type.toUpperCase()}
                    </span>
                    <div className={`flex items-center gap-1 ${getStatusColor(transaction.status)}`}>
                      {getStatusIcon(transaction.status)}
                      <span className="text-sm capitalize">{transaction.status}</span>
                    </div>
                  </div>
                  <span className="text-xs text-slate-400">
                    {formatTimestamp(transaction.timestamp)}
                  </span>
                </div>

                <div className="text-sm text-slate-300 space-y-1">
                  <div className="flex justify-between">
                    <span>Transaction ID:</span>
                    <span className="font-mono text-cyan-400">
                      {formatTransactionId(transaction.id)}
                    </span>
                  </div>
                  
                  {transaction.amount && (
                    <div className="flex justify-between">
                      <span>Amount:</span>
                      <span className="text-white">{transaction.amount}</span>
                    </div>
                  )}
                  
                  {transaction.recipient && (
                    <div className="flex justify-between">
                      <span>Recipient:</span>
                      <span className="font-mono text-cyan-400">
                        {formatTransactionId(transaction.recipient)}
                      </span>
                    </div>
                  )}
                  
                  {transaction.spender && (
                    <div className="flex justify-between">
                      <span>Spender:</span>
                      <span className="font-mono text-cyan-400">
                        {formatTransactionId(transaction.spender)}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default TransactionAccordion;
