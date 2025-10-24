interface LabelValueProps {
  label: string;
  value: string | number;
  valueSize?: 'xs' | 'sm' | 'base';
  valueBreak?: boolean;
}

const LabelValue = ({ label, value, valueSize = 'base', valueBreak = false }: LabelValueProps) => {
  const sizeClass = {
    xs: 'text-xs',
    sm: 'text-sm', 
    base: ''
  }[valueSize];

  const breakClass = valueBreak ? 'break-all' : '';

  return (
    <div>
      <span className="text-slate-300 text-sm">{label}</span>
      <p className={`text-cyan-400 font-mono ${sizeClass} ${breakClass}`}>{value}</p>
    </div>
  );
};

export default LabelValue;
