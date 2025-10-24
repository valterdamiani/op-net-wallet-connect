import { useState } from 'react';

interface LabelValueProps {
  label: string;
  value: string | number;
  valueSize?: 'xs' | 'sm' | 'base';
  valueBreak?: boolean;
  showCopyButton?: boolean;
  maxLength?: number;
  centered?: boolean;
  alignBetween?: boolean;
  isConnected?: boolean;
}

const LabelValue = ({ 
  label, 
  value, 
  valueSize = 'base', 
  valueBreak = false, 
  showCopyButton = false, 
  maxLength = 20,
  centered = false,
  alignBetween = false,
  isConnected = false
}: LabelValueProps) => {
  const [isCopied, setIsCopied] = useState(false);

  const sizeClass = {
    xs: 'text-xs',
    sm: 'text-sm', 
    base: ''
  }[valueSize];

  const breakClass = valueBreak ? 'break-all' : '';

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(String(value));
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 1000);
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
    }
  };

  const formatValue = (val: string | number) => {
    const str = String(val);
    if (str.length > maxLength) {
      return `${str.slice(0, maxLength)}...`;
    }
    return str;
  };

  return (
    <div className={centered ? 'text-center' : ''}>
      <span className={`text-slate-300 text-sm ${centered ? 'block' : ''}`}>{label}</span>
      <div className={`flex items-center gap-2 ${centered ? 'justify-center' : alignBetween ? 'justify-between' : ''}`}>
        <p className={`text-cyan-400 font-mono ${sizeClass} ${breakClass}`}>
          {formatValue(value)}
        </p>
        {showCopyButton && isConnected && (
          <button
            onClick={copyToClipboard}
            className={`transition-colors p-1 cursor-pointer ${isCopied ? 'text-green-400' : 'text-slate-400 hover:text-cyan-400'}`}
            title={isCopied ? 'Copied!' : 'Copy to clipboard'}
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
        )}
      </div>
    </div>
  );
};

export default LabelValue;
