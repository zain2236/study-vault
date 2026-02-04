import { 
  Upload, 
  X,
  Plus,
  Filter,
} from 'lucide-react';
import { useState } from 'react';
import { Header } from '~/components/dashboard-components/Header';
import { Sidebar } from '~/components/dashboard-components/Sidebar';
import { ResourceCard } from '~/components/dashboard-components/ResourceCard';

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);

  // LOGIC: Fetch user's uploaded resources from database
  const userResources = [
    {
      id: 1,
      title: "Data Structures Complete Notes",
      subject: "Data Structures",
      semester: 3,
      type: "Notes",
      fileType: "PDF",
      size: "2.4 MB",
      uploadedDate: "2 days ago",
      downloads: 47
    },
    {
      id: 2,
      title: "Operating Systems Assignment Solutions",
      subject: "Operating Systems",
      semester: 4,
      type: "Assignment",
      fileType: "PDF",
      size: "1.8 MB",
      uploadedDate: "5 days ago",
      downloads: 23
    },
    {
      id: 3,
      title: "Database Management Quiz Prep",
      subject: "Database Management",
      semester: 5,
      type: "Quiz",
      fileType: "DOCX",
      size: "856 KB",
      uploadedDate: "1 week ago",
      downloads: 31
    }
  ];

  // LOGIC: Handle file upload
  const handleFileUpload = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // Upload logic here
  };

  const Filters = () => (
    <div className="flex flex-wrap gap-3 mb-6">
      <button className="flex items-center space-x-2 px-4 py-2 bg-white rounded-lg border border-gray-300 hover:border-[#d97757] transition-colors">
        <Filter className="w-4 h-4" />
        <span className="text-sm font-medium">All Types</span>
      </button>
      <button className="px-4 py-2 bg-white rounded-lg border border-gray-300 hover:border-[#d97757] hover:text-[#d97757] transition-colors text-sm font-medium">
        Notes
      </button>
      <button className="px-4 py-2 bg-white rounded-lg border border-gray-300 hover:border-[#d97757] hover:text-[#d97757] transition-colors text-sm font-medium">
        Assignments
      </button>
      <button className="px-4 py-2 bg-white rounded-lg border border-gray-300 hover:border-[#d97757] hover:text-[#d97757] transition-colors text-sm font-medium">
        Quizzes
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f5f5f0]">
      {/* Top Navigation Bar */}
      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="flex">
        {/* Sidebar */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-8">
          {/* Header with Upload Button */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">My Resources</h2>
              <p className="text-gray-600 mt-1">Manage and organize your uploaded materials</p>
            </div>
            
            <button 
              onClick={() => setUploadModalOpen(true)}
              className="flex items-center justify-center space-x-2 bg-[#d97757] text-white px-6 py-3 rounded-lg hover:bg-[#c66847] transition-all transform hover:scale-105 shadow-lg"
            >
              <Plus className="w-5 h-5" />
              <span className="font-semibold">Upload Resource</span>
            </button>
          </div>

          {/* Filters */}
          <Filters />

          {/* Resources Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userResources.length > 0 ?  userResources.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            )) : <div className="bg-white rounded-xl p-12 text-center">
                <div className="w-20 h-20 bg-[#d97757]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Upload className="w-10 h-10 text-[#d97757]" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No Resources Yet</h3>
                <p className="text-gray-600 mb-6">Start uploading your study materials to help your classmates</p>
                <button className="bg-[#d97757] text-white px-6 py-3 rounded-lg hover:bg-[#c666847] transition-all">
                  Upload Your First Resource
                </button>
            </div>}
          </div>
        </main>
      </div>

      {/* Upload Modal */}
      {uploadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm" onClick={() => setUploadModalOpen(false)}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Upload Resource</h3>
              <button onClick={() => setUploadModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* LOGIC: Connect to handleFileUpload function */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Semester Dropdown */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Semester
                </label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d97757] focus:border-[#d97757] outline-none">
                  <option>Select Semester</option>
                  <option>Semester 1</option>
                  <option>Semester 2</option>
                  <option>Semester 3</option>
                  <option>Semester 4</option>
                  <option>Semester 5</option>
                  <option>Semester 6</option>
                  <option>Semester 7</option>
                  <option>Semester 8</option>
                </select>
              </div>

              {/* Subject Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Subject Name
                </label>
                <input
                  type="text"
                  placeholder="e.g., Data Structures"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d97757] focus:border-[#d97757] outline-none"
                />
              </div>

              {/* Resource Type */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Resource Type
                </label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d97757] focus:border-[#d97757] outline-none">
                  <option>Select Type</option>
                  <option>Notes</option>
                  <option>Assignment</option>
                  <option>Quiz</option>
                  <option>Date Sheet</option>
                  <option>Syllabus</option>
                  <option>Past Papers</option>
                </select>
              </div>

              {/* Resource Title */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Resource Title
                </label>
                <input
                  type="text"
                  placeholder="e.g., Complete Chapter 3 Notes"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d97757] focus:border-[#d97757] outline-none"
                />
              </div>

              {/* File Upload */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Upload File
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#d97757] transition-colors cursor-pointer">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 mb-1">Click to upload or drag and drop</p>
                  <p className="text-xs text-gray-500">PDF, DOCX, JPG, PNG (Max 50MB)</p>
                  {/* LOGIC: Handle file input and upload */}
                </div>
              </div>

              {/* Submit Button */}
              <div className="md:col-span-2">
                <button
                  onClick={handleFileUpload}
                  className="w-full bg-[#d97757] text-white py-3 rounded-lg hover:bg-[#c66847] transition-all font-semibold"
                >
                  Upload Resource
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}