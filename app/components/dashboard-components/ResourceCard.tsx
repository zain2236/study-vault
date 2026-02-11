import { File, FileText, MoreVertical, BookOpen, Calendar, Download, Trash2, Globe } from 'lucide-react';
import { memo, useState, useCallback, useMemo, useEffect, useRef } from 'react';
import { useRevalidator, useFetcher } from 'react-router';
import { getRelativeTime } from '~/utils/handle-time/relative-time';
import { DeleteConfirmModal } from '~/components/ui-components';

interface Resource {
  Id: number;
  title: string;
  subject: string;
  semester: number;
  resource_type: string;
  file_size: bigint | number;
  user_id: number;
  created_at: Date | string;
  updated_at: Date | string;
  file_path: string;
  downloads?: number;
  isPublic?: boolean;
}

interface ResourceCardProps {
  resource: Resource;
}

// Helper function to format file size
const formatFileSize = (size: bigint | number): string => {
  const sizeInBytes = typeof size === 'bigint' ? Number(size) : size;
  return `${(sizeInBytes / (1024 * 1024)).toFixed(2)} MB`;
};

// Custom hook for handling fetcher responses with toast prevention
function useFetcherToast(
  fetcher: ReturnType<typeof useFetcher>,
  onSuccess: (data: any) => void,
  onError?: (error: string) => void
) {
  const hasShownToastRef = useRef(false);
  const lastDataRef = useRef<any>(null);

  // Reset toast flag when a new submission starts
  useEffect(() => {
    if (fetcher.state === 'submitting') {
      hasShownToastRef.current = false;
      lastDataRef.current = null;
    }
  }, [fetcher.state]);

  useEffect(() => {
    const data = fetcher.data as { success?: boolean; error?: string; [key: string]: any } | undefined;
    
    // Skip if no data, already shown toast, or same data as before
    if (!data || hasShownToastRef.current || data === lastDataRef.current) {
      return;
    }

    lastDataRef.current = data;

    if (data.success) {
      hasShownToastRef.current = true;
      onSuccess(data);
    } else if (data.error && onError) {
      hasShownToastRef.current = true;
      onError(data.error);
    }
  }, [fetcher.data, onSuccess, onError]);
}

export const ResourceCard = memo(function ResourceCard({ resource }: ResourceCardProps) {
  const revalidator = useRevalidator();
  const downloadFetcher = useFetcher();
  const publishFetcher = useFetcher();
  const deleteFetcher = useFetcher();
  
  const [showMenu, setShowMenu] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [relativeTime, setRelativeTime] = useState('');
  const [message, setMessage] = useState<{ type: 'error' | 'success'; text: string } | null>(null);
  
  const lastPublishIntentRef = useRef<'publish' | 'unpublish' | null>(null);

  const isPublished = resource.isPublic ?? false;
  const fileSizeMB = useMemo(() => formatFileSize(resource.file_size), [resource.file_size]);
  const FileIcon = resource.resource_type === 'PDF' ? File : FileText;

  // Calculate relative time on client side
  useEffect(() => {
    setRelativeTime(getRelativeTime(resource.created_at));
  }, [resource.created_at]);

  // Handle download
  const handleDownload = useCallback(() => {
    const formData = new FormData();
    formData.append('intent', 'download');
    formData.append('resourceId', resource.Id.toString());
    downloadFetcher.submit(formData, { method: 'POST' });
  }, [resource.Id, downloadFetcher]);

  useFetcherToast(
    downloadFetcher,
    (data: { downloadUrl?: string }) => {
      if (data.downloadUrl) {
        // Trigger download without full page navigation
        const link = document.createElement('a');
        link.href = data.downloadUrl;
        link.download = '';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Refresh dashboard data (e.g., download count) after a short delay
        setTimeout(() => revalidator.revalidate(), 1000);
      }
    },
    (error) => {
      setMessage({ type: 'error', text: error });
      setTimeout(() => setMessage(null), 3000);
    }
  );

  // Handle publish/unpublish
  const handlePublish = useCallback(() => {
    setShowMenu(false);
    const intent = isPublished ? 'unpublish' : 'publish';
    lastPublishIntentRef.current = intent;
    
    const formData = new FormData();
    formData.append('intent', intent);
    formData.append('resourceId', resource.Id.toString());
    publishFetcher.submit(formData, { method: 'POST' });
  }, [isPublished, resource.Id, publishFetcher]);

  useFetcherToast(
    publishFetcher,
    () => {
      if (lastPublishIntentRef.current === 'publish') {
        setMessage({ type: 'success', text: `${resource.title} published successfully!` });
      } else {
        setMessage({ type: 'success', text: `${resource.title} unpublished successfully!` });
      }
      setTimeout(() => setMessage(null), 3000);
      lastPublishIntentRef.current = null;
      revalidator.revalidate();
    },
    (error) => {
      setMessage({ type: 'error', text: error });
      setTimeout(() => setMessage(null), 3000);
      lastPublishIntentRef.current = null;
    }
  );

  // Handle delete
  const handleDeleteClick = useCallback(() => {
    setShowMenu(false);
    setShowDeleteConfirm(true);
  }, []);

  const handleDeleteConfirm = useCallback(() => {
    setShowDeleteConfirm(false);
    setIsDeleting(true);

    const formData = new FormData();
    formData.append('intent', 'delete');
    formData.append('resourceId', resource.Id.toString());
    deleteFetcher.submit(formData, { method: 'POST' });
  }, [resource.Id, deleteFetcher]);

  useFetcherToast(
    deleteFetcher,
    () => {
      setMessage({ type: 'success', text: `${resource.title} deleted successfully!` });
      setTimeout(() => setMessage(null), 3000);
      revalidator.revalidate();
    },
    (error) => {
      setIsDeleting(false);
      setMessage({ type: 'error', text: error });
      setTimeout(() => setMessage(null), 3000);
    }
  );

  // Menu handlers
  const toggleMenu = useCallback(() => setShowMenu(prev => !prev), []);
  const closeMenu = useCallback(() => setShowMenu(false), []);
  const handleDeleteCancel = useCallback(() => setShowDeleteConfirm(false), []);

  if (isDeleting) {
    return (
      <article className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden opacity-50">
        <div className="p-5 text-center text-gray-500 dark:text-gray-400">
          Deleting...
        </div>
      </article>
    );
  }

  return (
    <>
      {message && (
        <div className={`fixed top-4 right-4 z-50 p-3 rounded-lg ${
          message.type === 'error' 
            ? 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400' 
            : 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-600 dark:text-green-400'
        }`}>
          <p className="text-sm font-medium">{message.text}</p>
        </div>
      )}
      <article className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200 border border-gray-200 dark:border-gray-700 overflow-hidden">
        <header className="bg-[#d97757]/10 dark:bg-[#d97757]/20 p-5">
          <div className="flex items-start justify-between">
            <div className="w-12 h-12 bg-[#d97757]/20 dark:bg-[#d97757]/30 rounded-lg flex items-center justify-center">
              <FileIcon className="w-6 h-6 text-[#d97757] dark:text-gray-300" aria-hidden="true" />
            </div>

            <nav className="relative">
              <button
                onClick={toggleMenu}
                className="p-2 rounded-lg bg-[#d97757]/20 dark:bg-[#d97757]/30 hover:bg-[#d97757]/30 dark:hover:bg-[#d97757]/40 transition-colors focus:outline-none focus:ring-2 focus:ring-[#d97757]/50"
                aria-label="More options"
                aria-expanded={showMenu}
              >
                <MoreVertical className="w-5 h-5 text-[#d97757] dark:text-gray-300" aria-hidden="true" />
              </button>

              {showMenu && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={closeMenu}
                    aria-hidden="true"
                  />
                  <menu className="absolute right-0 top-full mt-2 w-40 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 py-1 z-50">
                    <li>
                      <button
                        onClick={handlePublish}
                        className="w-full cursor-pointer px-4 py-2.5 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-3 transition-colors"
                      >
                        <Globe className="w-4 h-4" aria-hidden="true" />
                        <span>{isPublished ? 'Unpublish' : 'Publish'}</span>
                      </button>
                    </li>
                    <li>
                      <hr className="h-px bg-gray-200 dark:bg-gray-700 my-1 border-0" />
                    </li>
                    <li>
                      <button
                        onClick={handleDeleteClick}
                        className="w-full cursor-pointer px-4 py-2.5 text-left text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 dark:hover:text-red-200 flex items-center gap-3 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" aria-hidden="true" />
                        <span>Delete</span>
                      </button>
                    </li>
                  </menu>
                </>
              )}
            </nav>
          </div>

          <div className="mt-4 flex items-center gap-2">
            <span className="px-3 py-1 bg-[#d97757]/20 dark:bg-[#d97757]/30 rounded-full text-xs text-[#d97757] dark:text-white font-medium">
              {resource.resource_type}
            </span>
            {isPublished && (
              <span className="px-3 py-1 bg-green-500/20 dark:bg-green-500/30 rounded-full text-xs text-green-700 dark:text-white font-medium flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-green-600 dark:bg-green-400  rounded-full" aria-hidden="true" />
                Published
              </span>
            )}
          </div>
        </header>

        <section className="p-5 space-y-4">
          <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 line-clamp-2 leading-tight">
            {resource.title}
          </h3>

          <dl className="space-y-2">
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
              <BookOpen className="w-4 h-4 mr-2 text-[#d97757]" aria-hidden="true" />
              <dd>{resource.subject}</dd>
            </div>
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
              <Calendar className="w-4 h-4 mr-2 text-[#d97757]" aria-hidden="true" />
              <dd>Semester {resource.semester}</dd>
            </div>
          </dl>

          <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
              <span>{fileSizeMB}</span>
              <span aria-hidden="true">•</span>
              <time dateTime={new Date(resource.created_at).toISOString()}>
                {relativeTime || '...'}
              </time>
            </div>

            <div className="flex items-center gap-1.5 text-sm text-gray-700 dark:text-gray-300">
              <Download className="w-4 h-4 text-[#d97757]" aria-hidden="true" />
              <span className="font-semibold">{resource.downloads ?? 0}</span>
            </div>
          </div>

          <button
            onClick={handleDownload}
            disabled={downloadFetcher.state === 'submitting'}
            className="w-full px-4 py-2.5 bg-[#d97757] text-white rounded-lg hover:bg-[#c66847] cursor-pointer active:bg-[#b55937] transition-colors text-sm font-semibold flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#d97757]/50 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Download className="w-4 h-4" aria-hidden="true" />
            {downloadFetcher.state === 'submitting' ? 'Checking...' : 'Download'}
          </button>
        </section>
      </article>

      {showDeleteConfirm && (
        <DeleteConfirmModal
          resourceTitle={resource.title}
          onConfirm={handleDeleteConfirm}
          onCancel={handleDeleteCancel}
        />
      )}
    </>
  );
});
