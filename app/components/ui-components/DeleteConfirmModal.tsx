import { memo } from 'react';
import { AlertTriangle } from 'lucide-react';

interface DeleteConfirmModalProps {
  resourceTitle: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const DeleteConfirmModal = memo(function DeleteConfirmModal({
  resourceTitle,
  onConfirm,
  onCancel,
}: DeleteConfirmModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gray-600/50 dark:bg-gray-600/70 backdrop-blur-sm p-4"
      onClick={onCancel}
    >
      <div
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start gap-4 mb-6">
          <div className="shrink-0 w-12 h-12 bg-[#d97757]/20 dark:bg-[#d97757]/30 rounded-full flex items-center justify-center">
            <AlertTriangle className="w-6 h-6 text-[#d97757] dark:text-[#c66847]" aria-hidden="true" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              Delete Resource
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Are you sure you want to delete <strong>"{resourceTitle}"</strong>? This action cannot be undone.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm font-medium text-white bg-[#d97757] rounded-lg hover:bg-[#c66847] active:bg-[#b55937] transition-colors focus:outline-none focus:ring-2 focus:ring-[#d97757]/50 focus:ring-offset-2"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
});

