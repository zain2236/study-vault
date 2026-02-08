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
    <div className="bg-white dark:bg-gray-700 rounded-xl shadow-sm dark:shadow-gray-900/20 hover:shadow-xl dark:hover:shadow-gray-900/40 transition-all transform hover:-translate-y-1 overflow-hidden group border border-gray-100 dark:border-gray-600/50">
      {/* Card Header with Icon */}
      <div className="bg-linear-to-br from-[#d97757] to-[#c66847] p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-white opacity-10 rounded-full blur-2xl"></div>
        <div className="flex items-start justify-between relative z-10">
          <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
            {resource.fileType === 'PDF' ? (
              <File className="w-6 h-6 text-white" />
            ) : (
              <FileText className="w-6 h-6 text-white" />
            )}
          </div>
        </div>
        <div className="mt-4 relative z-10">
          <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs text-white font-medium">
            {resource.type}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6">
        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2 line-clamp-2">
          {resource.title}
        </h3>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
            <BookOpen className="w-4 h-4 mr-2 text-[#d97757]" />
            <span>{resource.subject}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
            <Calendar className="w-4 h-4 mr-2 text-[#d97757]" />
            <span>Semester {resource.semester}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
            <User className="w-4 h-4 mr-2 text-[#d97757]" />
            <span>Uploaded by {resource.uploadedBy}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-600">
          <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
            <span>{resource.size}</span>
            <span>•</span>
            <span>{resource.uploadedDate}</span>
          </div>
          <div className="flex items-center space-x-1 text-sm text-gray-700 dark:text-gray-300">
            <Download className="w-4 h-4 text-[#d97757]" />
            <span className="font-semibold">{resource.downloads}</span>
          </div>
        </div>

        {/* Download Button Only */}
        <div className="mt-4">
          <button 
            onClick={handleDownload}
            className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 bg-[#d97757] text-white rounded-lg hover:bg-[#c66847] transition-all transform hover:scale-105 shadow-md shadow-[#d97757]/30 text-sm font-semibold"
          >
            <Download className="w-4 h-4" />
            <span>Download</span>
          </button>
        </div>
      </div>
    </div>
  );
});

