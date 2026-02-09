import { Loader2 } from 'lucide-react';

interface LoadMoreButtonProps {
  onClick: () => void;
  isLoading: boolean;
}

export function LoadMoreButton({ onClick, isLoading }: LoadMoreButtonProps) {
  return (
    <div className="mt-12 lg:mt-16 text-center">
      <button
        onClick={onClick}
        disabled={isLoading}
        className="group px-8 py-3.5 bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm border-2 border-gray-300/60 dark:border-gray-600/50 text-gray-700 dark:text-gray-300 rounded-xl hover:border-[#d97757] hover:text-[#d97757] hover:shadow-lg hover:shadow-[#d97757]/20 transition-all duration-300 font-semibold transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2 mx-auto"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Loading...</span>
          </>
        ) : (
          <span>Load More Resources</span>
        )}
      </button>
    </div>
  );
}

