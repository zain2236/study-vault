import { File, FileText, BookOpen, Calendar, Download, User } from 'lucide-react';
import { memo, useCallback } from 'react';
import { useRevalidator } from 'react-router';

interface BrowseResource {
  id: number;
  title: string;
  subject: string;
  semester: number;
  type: string;
  fileType: string;
  size: string;
  uploadedBy: string;
  uploadedDate: string;
  downloads: number;
}

interface BrowseResourceCardProps {
  resource: BrowseResource;
}

export const BrowseResourceCard = memo(function BrowseResourceCard({ resource }: BrowseResourceCardProps) {
  const revalidator = useRevalidator();

  const handleDownload = useCallback(() => {
    window.location.href = `/download/${resource.id}`;
    setTimeout(() => revalidator.revalidate(), 1000);
  }, [resource.id, revalidator]);

  return (
    <article className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200 border border-gray-200 dark:border-gray-700 overflow-hidden">
      <header className="bg-[#d97757]/10 dark:bg-[#d97757]/20 p-5">
        <div className="flex items-start justify-between">
          <div className="w-12 h-12 bg-[#d97757]/20 dark:bg-[#d97757]/30 rounded-lg flex items-center justify-center">
            {resource.fileType === 'PDF' ? (
              <File className="w-6 h-6 text-[#d97757] dark:text-[#c66847]" aria-hidden="true" />
            ) : (
              <FileText className="w-6 h-6 text-[#d97757] dark:text-[#c66847]" aria-hidden="true" />
            )}
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2">
          <span className="px-3 py-1 bg-[#d97757]/20 dark:bg-[#d97757]/30 rounded-full text-xs text-[#d97757] dark:text-[#c66847] font-medium">
            {resource.type}
          </span>
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
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
            <User className="w-4 h-4 mr-2 text-[#d97757]" aria-hidden="true" />
            <dd>Uploaded by {resource.uploadedBy}</dd>
          </div>
        </dl>

        <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
            <span>{resource.size}</span>
            <span aria-hidden="true">•</span>
            <time dateTime={resource.uploadedDate}>
              {resource.uploadedDate}
            </time>
          </div>

          <div className="flex items-center gap-1.5 text-sm text-gray-700 dark:text-gray-300">
            <Download className="w-4 h-4 text-[#d97757]" aria-hidden="true" />
            <span className="font-semibold">{resource.downloads}</span>
          </div>
        </div>

        <button
          onClick={handleDownload}
          className="w-full px-4 py-2.5 bg-[#d97757] cursor-pointer text-white rounded-lg hover:bg-[#c66847] active:bg-[#b55937] transition-colors text-sm font-semibold flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#d97757]/50 focus:ring-offset-2"
        >
          <Download className="w-4 h-4" aria-hidden="true" />
          Download
        </button>
      </section>
    </article>
  );
});
