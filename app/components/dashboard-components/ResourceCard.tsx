import { File, FileText, MoreVertical, BookOpen, Calendar, Download } from 'lucide-react';
import { memo } from 'react';
import { Link } from 'react-router';
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
}

interface ResourceCardProps {
  resource: Resource;
}

export const ResourceCard = memo(function ResourceCard({ resource }: ResourceCardProps) {
  return (
    <div className="bg-white dark:bg-gray-700 rounded-xl shadow-sm dark:shadow-gray-900/20 hover:shadow-xl dark:hover:shadow-gray-900/40 transition-all transform hover:-translate-y-1 overflow-hidden group border border-gray-100 dark:border-gray-600/50">
      {/* Card Header with Icon */}
      <div className="bg-linear-to-br from-[#d97757] to-[#c66847] p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-white opacity-10 rounded-full blur-2xl"></div>
        <div className="flex items-start justify-between relative z-10">
          <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
            {resource.resource_type === 'PDF' ? (
              <File className="w-6 h-6 text-white" />
            ) : (
              <FileText className="w-6 h-6 text-white" />
            )}
          </div>
          
        </div>
        <div className="mt-4 relative z-10">
          <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs text-white font-medium">
            {resource.resource_type}
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
        </div>

            {/* // FILE SIZE AND UPLOADED AT TIME */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-600">
          <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
            <span>{typeof resource.file_size === 'bigint' 
              ? `${(Number(resource.file_size) / (1024 * 1024)).toFixed(2)} MB`
              : `${(resource.file_size / (1024 * 1024)).toFixed(2)} MB`}</span>
            <span>•</span>
            <span>{getRelativeTime(resource.created_at)}</span>
          </div>

          {/* // Handle Downloads Logic */}
          <div className="flex items-center space-x-1 text-sm text-gray-700 dark:text-gray-300">
            <Download className="w-4 h-4 text-[#d97757]" />
            <span className="font-semibold">0</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 mt-4">
          <Link 
          to={resource.file_path} 
          target='_blank'
          className="flex-1 px-4 py-2 text-center bg-[#d97757] text-white rounded-lg hover:bg-[#c66847] transition-colors text-sm font-semibold">
            Download
          </Link>
          <button className="px-4 py-2 text-center border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:border-[#d97757] hover:text-[#d97757] transition-colors text-sm font-semibold">
            Edit
          </button>
        </div>
      </div>
    </div>
  );
});
