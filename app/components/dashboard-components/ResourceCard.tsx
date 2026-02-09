import { File, FileText, MoreVertical, BookOpen, Calendar, Download, Trash2, Globe, AlertTriangle } from 'lucide-react';
import { memo, useState, useCallback, useMemo, useEffect } from 'react';
import { useRevalidator, useFetcher } from 'react-router';
import { getRelativeTime } from '~/utils/handle-time/relative-time';

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

export const ResourceCard = memo(function ResourceCard({ resource }: ResourceCardProps) {
  const revalidator = useRevalidator();
  const downloadFetcher = useFetcher();
  const [showMenu, setShowMenu] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [downloadError, setDownloadError] = useState<string | null>(null);
  const [relativeTime, setRelativeTime] = useState<string>('');

  const isPublished = resource.isPublic ?? false;
  const fileSizeMB = useMemo(() => {
    const size = typeof resource.file_size === 'bigint'
      ? Number(resource.file_size)
      : resource.file_size;
    return `${(size / (1024 * 1024)).toFixed(2)} MB`;
  }, [resource.file_size]);

  // Calculate relative time only on client to avoid hydration mismatch
  useEffect(() => {
    setRelativeTime(getRelativeTime(resource.created_at));
  }, [resource.created_at]);

  const handleDownload = useCallback(() => {
    setDownloadError(null);
    const formData = new FormData();
    formData.append('intent', 'download');
    formData.append('resourceId', resource.Id.toString());
    downloadFetcher.submit(formData, { method: 'POST' });
  }, [resource.Id, downloadFetcher]);

  // Handle download response
  useEffect(() => {
    const data = downloadFetcher.data;
    if (data?.success && data.downloadUrl) {
      // File exists, trigger download
      window.location.href = data.downloadUrl;
      setTimeout(() => revalidator.revalidate(), 1000);
    } else if (data?.error) {
      // Show error message
      setDownloadError(data.error);
    }
  }, [downloadFetcher.data, revalidator]);

  const handlePublish = useCallback(async () => {
    setShowMenu(false);
    const formData = new FormData();
    formData.append('intent', isPublished ? 'unpublish' : 'publish');
    formData.append('resourceId', resource.Id.toString());

    await fetch('/user/dashboard', { method: 'POST', body: formData });
    revalidator.revalidate();
  }, [isPublished, resource.Id, revalidator]);

  const handleDeleteClick = useCallback(() => {
    setShowMenu(false);
    setShowDeleteConfirm(true);
  }, []);

  const handleDeleteConfirm = useCallback(async () => {
    setShowDeleteConfirm(false);
    setIsDeleting(true);

    const formData = new FormData();
    formData.append('intent', 'delete');
    formData.append('resourceId', resource.Id.toString());

    const response = await fetch('/user/dashboard', { method: 'POST', body: formData });

    if (response.ok) {
      revalidator.revalidate();
    } else {
      setIsDeleting(false);
      alert('Failed to delete resource. Please try again.');
    }
  }, [resource.Id, revalidator]);

  const handleDeleteCancel = useCallback(() => {
    setShowDeleteConfirm(false);
  }, []);

  const toggleMenu = useCallback(() => setShowMenu(prev => !prev), []);
  const closeMenu = useCallback(() => setShowMenu(false), []);

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
      <article className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200 border border-gray-200 dark:border-gray-700 overflow-hidden">
        <header className="bg-[#d97757]/10 dark:bg-[#d97757]/20 p-5">
          <div className="flex items-start justify-between">
            <div className="w-12 h-12 bg-[#d97757]/20 dark:bg-[#d97757]/30 rounded-lg flex items-center justify-center">
              {resource.resource_type === 'PDF' ? (
                <File className="w-6 h-6 text-[#d97757] dark:text-[#c66847]" aria-hidden="true" />
              ) : (
                <FileText className="w-6 h-6 text-[#d97757] dark:text-[#c66847]" aria-hidden="true" />
              )}
            </div>

            <nav className="relative">
              <button
                onClick={toggleMenu}
                className="p-2 rounded-lg bg-[#d97757]/20 dark:bg-[#d97757]/30 hover:bg-[#d97757]/30 dark:hover:bg-[#d97757]/40 transition-colors focus:outline-none focus:ring-2 focus:ring-[#d97757]/50"
                aria-label="More options"
                aria-expanded={showMenu}
              >
                <MoreVertical className="w-5 h-5 text-[#d97757] dark:text-[#c66847]" aria-hidden="true" />
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
                        className="w-full px-4 py-2.5 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-3 transition-colors"
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
                        className="w-full px-4 py-2.5 text-left text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-3 transition-colors"
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
            <span className="px-3 py-1 bg-[#d97757]/20 dark:bg-[#d97757]/30 rounded-full text-xs text-[#d97757] dark:text-[#c66847] font-medium">
              {resource.resource_type}
            </span>
            {isPublished && (
              <span className="px-3 py-1 bg-green-500/20 dark:bg-green-500/30 rounded-full text-xs text-green-700 dark:text-green-400 font-medium flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-green-600 dark:bg-green-400 rounded-full" aria-hidden="true" />
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

          {downloadError && (
            <div className="mb-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
              <p className="text-red-600 dark:text-red-400 text-sm font-medium flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                {downloadError}
              </p>
            </div>
          )}
          <button
            onClick={handleDownload}
            disabled={downloadFetcher.state === 'submitting'}
            className="w-full px-4 py-2.5 bg-[#d97757] text-white rounded-lg hover:bg-[#c66847] active:bg-[#b55937] transition-colors text-sm font-semibold flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#d97757]/50 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Download className="w-4 h-4" aria-hidden="true" />
            {downloadFetcher.state === 'submitting' ? 'Checking...' : 'Download'}
          </button>
        </section>
      </article>

      {showDeleteConfirm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-gray-600/50 dark:bg-gray-600/70 backdrop-blur-sm p-4"
          onClick={handleDeleteCancel}
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
                  Are you sure you want to delete <strong>"{resource.title}"</strong>? This action cannot be undone.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3">
              <button
                onClick={handleDeleteCancel}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="px-4 py-2 text-sm font-medium text-white bg-[#d97757] rounded-lg hover:bg-[#c66847] active:bg-[#b55937] transition-colors focus:outline-none focus:ring-2 focus:ring-[#d97757]/50 focus:ring-offset-2"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
});
