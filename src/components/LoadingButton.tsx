interface LoadingButtonProps {
  onClick: () => void;
  loading: boolean;
  children: React.ReactNode;
  className?: string;
}

const LoadingButton = ({ onClick, loading, children, className = '' }: LoadingButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 disabled:opacity-50 ${className}`}
    >
      {loading ? (
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          <span>Loading...</span>
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default LoadingButton;
