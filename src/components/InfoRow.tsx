interface InfoRowProps {
  label: string;
  value: string;
  isLast?: boolean;
}

const InfoRow = ({ label, value, isLast = false }: InfoRowProps) => {
  return (
    <div className={`flex justify-between items-center py-3 border-b border-slate-600 ${isLast ? 'last:border-b-0' : ''}`}>
      <span className="font-semibold text-white">{label}</span>
      <span className="text-slate-300 font-mono">{value}</span>
    </div>
  );
};

export default InfoRow;
