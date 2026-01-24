import { File, FileText, MoreVertical, BookOpen, Calendar, Download } from 'lucide-react';

interface Resource {
  id: number;
  title: string;
  subject: string;
  semester: number;
  type: string;
  fileType: string;
  size: string;
  uploadedDate: string;
  downloads: number;
}

interface ResourceCardProps {
  resource: Resource;
}

export function ResourceCard({ resource }: ResourceCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all transform hover:-translate-y-1 overflow-hidden group">
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
          <button className="text-white transition-opacity hover:opacity-80">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
        <div className="mt-4 relative z-10">
          <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs text-white font-medium">
            {resource.type}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
          {resource.title}
        </h3>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <BookOpen className="w-4 h-4 mr-2 text-[#d97757]" />
            <span>{resource.subject}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="w-4 h-4 mr-2 text-[#d97757]" />
            <span>Semester {resource.semester}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <div className="flex items-center space-x-4 text-xs text-gray-500">
            <span>{resource.size}</span>
            <span>•</span>
            <span>{resource.uploadedDate}</span>
          </div>
          <div className="flex items-center space-x-1 text-sm text-gray-700">
            <Download className="w-4 h-4 text-[#d97757]" />
            <span className="font-semibold">{resource.downloads}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 mt-4">
          <button className="flex-1 px-4 py-2 bg-[#d97757] text-white rounded-lg hover:bg-[#c66847] transition-colors text-sm font-semibold">
            View
          </button>
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:border-[#d97757] hover:text-[#d97757] transition-colors text-sm font-semibold">
            Edit
          </button>
        </div>
      </div>
    </div>
  );
}
