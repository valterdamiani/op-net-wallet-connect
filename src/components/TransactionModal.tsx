
interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  transactionHash: string;
  status: 'pending' | 'success' | 'failed';
  onGetTransactionDetails?: (txHash: string) => void;
  onGetTransactionReceipt?: (txHash: string) => void;
}

const TransactionModal = ({ isOpen, onClose, transactionHash, status, onGetTransactionDetails, onGetTransactionReceipt }: TransactionModalProps) => {

  if (!isOpen) return null;

  const getStatusColor = () => {
    switch (status) {
      case 'pending':
        return 'text-yellow-500';
      case 'success':
        return 'text-green-500';
      case 'failed':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'pending':
        return '⏳';
      case 'success':
        return '✅';
      case 'failed':
        return '❌';
      default:
        return '❓';
    }
  };

  const opScanUrl = `https://opscan.org/tx/${transactionHash}`;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-slate-800 rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Transaction Result</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-xl"
          >
            ×
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{getStatusIcon()}</span>
            <span className={`font-semibold ${getStatusColor()}`}>
              {status.toUpperCase()}
            </span>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Transaction Hash:
            </label>
            <div className="bg-slate-700 p-2 rounded text-sm font-mono text-white break-all">
              {transactionHash}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <a
                href={opScanUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-center transition-colors"
              >
                View on OP_SCAN
              </a>
              <button
                onClick={onClose}
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded transition-colors"
              >
                Close
              </button>
            </div>
            
            {(onGetTransactionDetails || onGetTransactionReceipt) && (
              <div className="flex gap-2">
                {onGetTransactionDetails && (
                  <button
                    onClick={() => onGetTransactionDetails(transactionHash)}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition-colors"
                  >
                    Get Details
                  </button>
                )}
                {onGetTransactionReceipt && (
                  <button
                    onClick={() => onGetTransactionReceipt(transactionHash)}
                    className="flex-1 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded transition-colors"
                  >
                    Get Receipt
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
