
import { 
  BookOpen, 
  Search, 
  Download, 
  Filter,
  FileText,
  Calendar,
  Users,
  Menu,
  X,
  Bell,
  Settings,
  LogOut,
  File,
  ChevronDown,
  SlidersHorizontal,
  Eye,
  Star
} from 'lucide-react';
import { useState } from 'react';

export default function BrowseResourcesPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedSemester, setSelectedSemester] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // LOGIC: Fetch all public resources from database
  const allResources = [
    {
      id: 1,
      title: "Data Structures Complete Notes",
      subject: "Data Structures",
      semester: 3,
      type: "Notes",
      fileType: "PDF",
      size: "2.4 MB",
      uploadedBy: "Sarah Ahmed",
      uploadedDate: "2 days ago",
      downloads: 47,
      rating: 4.8
    },
    {
      id: 2,
      title: "Operating Systems Assignment Solutions",
      subject: "Operating Systems",
      semester: 4,
      type: "Assignment",
      fileType: "PDF",
      size: "1.8 MB",
      uploadedBy: "Ali Khan",
      uploadedDate: "5 days ago",
      downloads: 23,
      rating: 4.5
    },
    {
      id: 3,
      title: "Database Management Quiz Prep",
      subject: "Database Management",
      semester: 5,
      type: "Quiz",
      fileType: "DOCX",
      size: "856 KB",
      uploadedBy: "Fatima Malik",
      uploadedDate: "1 week ago",
      downloads: 31,
      rating: 4.9
    },
    {
      id: 4,
      title: "Computer Networks Lab Manual",
      subject: "Computer Networks",
      semester: 6,
      type: "Notes",
      fileType: "PDF",
      size: "3.2 MB",
      uploadedBy: "Hassan Raza",
      uploadedDate: "3 days ago",
      downloads: 56,
      rating: 4.7
    },
    {
      id: 5,
      title: "Calculus II Final Exam Papers",
      subject: "Calculus",
      semester: 2,
      type: "Past Papers",
      fileType: "PDF",
      size: "1.5 MB",
      uploadedBy: "Ayesha Siddiqui",
      uploadedDate: "1 week ago",
      downloads: 89,
      rating: 5.0
    },
    {
      id: 6,
      title: "Algorithms & Complexity Date Sheet",
      subject: "Algorithms",
      semester: 7,
      type: "Date Sheet",
      fileType: "PDF",
      size: "245 KB",
      uploadedBy: "Ahmed Ali",
      uploadedDate: "4 days ago",
      downloads: 12,
      rating: 4.2
    }
  ];

  // LOGIC: Filter resources based on semester, type, and search query
  const filteredResources = allResources;

  return (
    <div className="min-h-screen bg-[#f5f5f0]">
      {/* Top Navigation Bar */}
      <nav className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo & Mobile Menu Button */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden text-gray-700 hover:text-[#d97757] transition-colors"
              >
                <Menu className="w-6 h-6" />
              </button>
              
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-[#d97757] rounded-lg flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900 hidden sm:block">StudyVault</span>
              </div>
            </div>

            {/* Search Bar - Desktop */}
            <div className="hidden md:flex flex-1 max-w-lg mx-8">
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search by subject, title, or keyword..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d97757] focus:border-[#d97757] transition-all outline-none"
                />
              </div>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              <button className="relative text-gray-700 hover:text-[#d97757] transition-colors">
                <Bell className="w-6 h-6" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#d97757] rounded-full text-xs text-white flex items-center justify-center">3</span>
              </button>
              
              <button className="text-gray-700 hover:text-[#d97757] transition-colors">
                <Settings className="w-6 h-6" />
              </button>

              {/* User Avatar */}
              <div className="flex items-center space-x-2 cursor-pointer group">
                <div className="w-9 h-9 bg-[#d97757] rounded-full flex items-center justify-center text-white font-semibold">
                  JD
                </div>
                <span className="hidden lg:block text-sm font-medium text-gray-700 group-hover:text-[#d97757] transition-colors">
                  John Doe
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden px-4 pb-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#d97757] focus:border-[#d97757] transition-all outline-none"
            />
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar - Desktop */}
        <aside className="hidden lg:flex lg:flex-col lg:w-64 bg-white shadow-sm min-h-[calc(100vh-4rem)] sticky top-16">
          <nav className="flex-1 p-4 space-y-2">
            <a href="#" className="flex items-center space-x-3 px-4 py-3 bg-[#d97757] bg-opacity-10 text-[#d97757] rounded-lg font-semibold">
              <Search className="w-5 h-5" />
              <span>Browse All</span>
            </a>
            <a href="#" className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
              <BookOpen className="w-5 h-5" />
              <span>My Resources</span>
            </a>
            <a href="#" className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
              <Download className="w-5 h-5" />
              <span>Downloads</span>
            </a>
            <a href="#" className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
              <Users className="w-5 h-5" />
              <span>Community</span>
            </a>

            <div className="pt-4 mt-4 border-t border-gray-200">
              <p className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                Filter by Semester
              </p>
              <button 
                onClick={() => setSelectedSemester('all')}
                className={`w-full flex items-center justify-between px-4 py-2 text-sm rounded-lg transition-colors ${
                  selectedSemester === 'all' 
                    ? 'bg-[#d97757] bg-opacity-10 text-[#d97757] font-semibold' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span>All Semesters</span>
              </button>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                <button 
                  key={sem}
                  onClick={() => setSelectedSemester(sem)}
                  className={`w-full flex items-center justify-between px-4 py-2 text-sm rounded-lg transition-colors ${
                    selectedSemester === sem 
                      ? 'bg-[#d97757] bg-opacity-10 text-[#d97757] font-semibold' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <span>Semester {sem}</span>
                  <span className="text-xs bg-gray-200 px-2 py-1 rounded-full">
                    {allResources.filter(r => r.semester === sem).length}
                  </span>
                </button>
              ))}
            </div>

            <div className="pt-4 mt-4 border-t border-gray-200">
              <p className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                Filter by Type
              </p>
              {['Notes', 'Assignment', 'Quiz', 'Date Sheet', 'Past Papers'].map((type) => (
                <button 
                  key={type}
                  onClick={() => setSelectedType(type.toLowerCase())}
                  className={`w-full flex items-center justify-between px-4 py-2 text-sm rounded-lg transition-colors ${
                    selectedType === type.toLowerCase() 
                      ? 'bg-[#d97757] bg-opacity-10 text-[#d97757] font-semibold' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <span>{type}</span>
                </button>
              ))}
            </div>
          </nav>

          <div className="p-4 border-t border-gray-200">
            <button className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:text-[#d97757] rounded-lg transition-colors w-full">
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </aside>

        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div className="lg:hidden fixed inset-0 z-50 bg-gray-900 bg-opacity-50" onClick={() => setSidebarOpen(false)}>
            <aside className="absolute left-0 top-0 bottom-0 w-64 bg-white shadow-xl overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between p-4 border-b">
                <span className="text-lg font-bold text-gray-900">Filters</span>
                <button onClick={() => setSidebarOpen(false)} className="text-gray-700">
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <nav className="flex-1 p-4 space-y-2">
                <a href="#" className="flex items-center space-x-3 px-4 py-3 bg-[#d97757] bg-opacity-10 text-[#d97757] rounded-lg font-semibold">
                  <Search className="w-5 h-5" />
                  <span>Browse All</span>
                </a>
                <a href="#" className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                  <BookOpen className="w-5 h-5" />
                  <span>My Resources</span>
                </a>
                <a href="#" className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                  <Download className="w-5 h-5" />
                  <span>Downloads</span>
                </a>
                
                <div className="pt-4 mt-4 border-t border-gray-200">
                  <p className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                    Filter by Semester
                  </p>
                  <button className="w-full flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                    <span>All Semesters</span>
                  </button>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                    <button key={sem} className="w-full flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                      <span>Semester {sem}</span>
                    </button>
                  ))}
                </div>
              </nav>
            </aside>
          </div>
        )}

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
              Browse All Resources
            </h1>
            <p className="text-gray-600 text-lg">
              Explore {allResources.length} study materials shared by the community
            </p>
          </div>

          {/* Stats Banner */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-[#d97757] bg-opacity-10 rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-[#d97757]" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{allResources.length}</h3>
                  <p className="text-xs text-gray-600">Total Resources</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-[#d97757] bg-opacity-10 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-[#d97757]" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">500+</h3>
                  <p className="text-xs text-gray-600">Contributors</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-[#d97757] bg-opacity-10 rounded-lg flex items-center justify-center">
                  <Download className="w-6 h-6 text-[#d97757]" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">2.5K</h3>
                  <p className="text-xs text-gray-600">Downloads</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-[#d97757] bg-opacity-10 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-[#d97757]" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">8</h3>
                  <p className="text-xs text-gray-600">Semesters</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Filters - Mobile/Tablet */}
          <div className="lg:hidden flex items-center gap-3 mb-6 overflow-x-auto pb-2">
            <button 
              onClick={() => setSidebarOpen(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-white rounded-lg border border-gray-300 hover:border-[#d97757] transition-colors whitespace-nowrap"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span className="text-sm font-medium">All Filters</span>
            </button>
            <button className="px-4 py-2 bg-white rounded-lg border border-gray-300 hover:border-[#d97757] hover:text-[#d97757] transition-colors text-sm font-medium whitespace-nowrap">
              Semester 1-8
            </button>
            <button className="px-4 py-2 bg-white rounded-lg border border-gray-300 hover:border-[#d97757] hover:text-[#d97757] transition-colors text-sm font-medium whitespace-nowrap">
              All Types
            </button>
          </div>

          {/* Sort Options */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
            <p className="text-gray-600">
              Showing <span className="font-semibold text-gray-900">{filteredResources.length}</span> resources
            </p>
            
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Sort by:</span>
              <button className="flex items-center space-x-2 px-4 py-2 bg-white rounded-lg border border-gray-300 hover:border-[#d97757] transition-colors">
                <span className="text-sm font-medium">Most Recent</span>
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Resources Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((resource) => (
              <div key={resource.id} className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all transform hover:-translate-y-1 overflow-hidden group">
                {/* Card Header with Icon */}
                <div className="bg-gradient-to-br from-[#d97757] to-[#c66847] p-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-white opacity-10 rounded-full blur-2xl"></div>
                  <div className="flex items-start justify-between relative z-10">
                    <div className="w-12 h-12 bg-white bg-opacity-20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                      {resource.fileType === 'PDF' ? (
                        <File className="w-6 h-6 text-white" />
                      ) : (
                        <FileText className="w-6 h-6 text-white" />
                      )}
                    </div>
                    <div className="flex items-center space-x-1 text-white">
                      <Star className="w-4 h-4 fill-white" />
                      <span className="text-sm font-semibold">{resource.rating}</span>
                    </div>
                  </div>
                  <div className="mt-4 relative z-10">
                    <span className="inline-block px-3 py-1 bg-white bg-opacity-20 backdrop-blur-sm rounded-full text-xs text-white font-medium">
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
                    <div className="flex items-center text-sm text-gray-600">
                      <Users className="w-4 h-4 mr-2 text-[#d97757]" />
                      <span>By {resource.uploadedBy}</span>
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
                    <button className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-[#d97757] text-white rounded-lg hover:bg-[#c66847] transition-colors text-sm font-semibold">
                      <Eye className="w-4 h-4" />
                      <span>Preview</span>
                    </button>
                    <button className="flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:border-[#d97757] hover:text-[#d97757] transition-colors text-sm font-semibold">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          <div className="mt-12 text-center">
            <button className="px-8 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-lg hover:border-[#d97757] hover:text-[#d97757] transition-all font-semibold">
              Load More Resources
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}