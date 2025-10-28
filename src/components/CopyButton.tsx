import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

interface CopyButtonProps {
  value: string | number;
}

const CopyButton = ({ value }: CopyButtonProps) => {
  const { t } = useTranslation();
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(String(value));
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 1000);
    } catch (error) {
      toast.error(t('main.notifications.failedToCopyToClipboard', { error: error }));
    }
  };

  return (
    <button
      onClick={copyToClipboard}
      className={`transition-colors p-1 cursor-pointer ${isCopied ? 'text-green-400' : 'text-slate-400 hover:text-cyan-400'}`}
      title={isCopied ? t('main.wallet.copied') : t('main.wallet.copyToClipboard')}
    >
      {isCopied ? (
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
            d="M5 13l4 4L19 7" 
          />
        </svg>
      ) : (
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
            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" 
          />
        </svg>
      )}
    </button>
  );
};

export default CopyButton;
