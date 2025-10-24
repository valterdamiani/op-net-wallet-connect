import CopyButton from './CopyButton';

interface LabelValueProps {
  label: string;
  value: string | number;
  showCopyButton?: boolean;
  centered?: boolean;
  isConnected?: boolean;
}

const LabelValue = ({ 
  label, 
  value, 
  showCopyButton = false, 
  centered = false,
  isConnected = false
}: LabelValueProps) => {
  const formatValue = (val: string | number) => {
    return String(val);
  };

  return (
    <div className={centered ? 'text-center' : ''}>
      <span className={`text-slate-300 text-sm`}>{label}</span>
      <div className={`flex items-center gap-1 ${centered ? 'justify-center' : 'justify-between'}`}>
        <p className="text-cyan-400 font-mono text-sm truncate">
          {formatValue(value)}
        </p>
        {showCopyButton && isConnected && (
          <CopyButton value={value} />
        )}
      </div>
    </div>
  );
};

export default LabelValue;
