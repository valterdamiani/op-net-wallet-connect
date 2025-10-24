import { useTranslation } from 'react-i18next';

interface StatusIndicatorProps {
  isConnected: boolean;
  account?: string | null;
  networkName?: string;
  chainId?: string;
}

const StatusIndicator = ({ isConnected, account, networkName, chainId }: StatusIndicatorProps) => {
  const { t } = useTranslation();

  return (
    <div className="bg-slate-800/95 backdrop-blur-md p-4 rounded-xl shadow-xl border border-slate-700 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`w-4 h-4 rounded-full shadow-lg ${
            isConnected 
              ? 'bg-green-500 shadow-green-500/50 animate-pulse' 
              : 'bg-red-500 shadow-red-500/50'
          }`}></div>
          <div>
            <div className="text-sm font-semibold text-white">
              {isConnected ? t('main.wallet.connected') : t('main.wallet.disconnected')}
            </div>
            {isConnected && account && (
              <div className="text-xs text-slate-300 font-mono">
                {account.slice(0, 6)}...{account.slice(-4)}
              </div>
            )}
          </div>
        </div>
        
        {isConnected && networkName && (
          <div className="text-right">
            <div className="text-xs text-slate-300">Network</div>
            <div className="text-sm font-semibold text-white">{networkName}</div>
            {chainId && (
              <div className="text-xs text-slate-400">Chain ID: {chainId}</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default StatusIndicator;
