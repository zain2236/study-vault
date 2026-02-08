import { useState, useMemo, useCallback, memo } from 'react';
import { useLoaderData } from 'react-router';
import { 
  FileText,
  Users,
  Download,
  BookOpen,
  Search,
  SlidersHorizontal,
  ChevronDown,
  X,
  Sparkles
} from 'lucide-react';

import prisma from '~/utils/prisma.server';
import { BrowseResourceCard } from '~/components/dashboard-components/BrowseResourceCard';
import { StatCard } from '~/components/dashboard-components/StatCard';
import { transformResource } from '~/utils/resources/resource-transform.server';
import { 
  filterResources, 
  calculateSemesterCounts, 
  hasActiveFilters,
  type FilterState 
} from '~/utils/resources/resource-filters';

// Loader function
export async function loader() {
  try {
    const resources = await prisma.resource.findMany({
      where: {
        isPublic: true
      },
      include: {
        user: {
          select: {
            user_name: true
          }
        }
      },
      orderBy: {
        created_at: 'desc'
      }
    });

    if (!resources) {
      return { resources: [], error: 'No resources found.' };
    }

    const transformedResources = resources.map(transformResource);
    
    return { resources: transformedResources, error: null };
  } catch (error) {
    return { resources: [], error: 'Something went wrong. Please try again.' };
  }
}

// Filter Button Component
const FilterButton = memo(({ 
  label, 
  isActive, 
  onClick, 
  count 
}: { 
  label: string; 
  isActive: boolean; 
  onClick: () => void;
  count?: number;
}) => (
  <button
    onClick={onClick}
    className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all duration-200 ${
      isActive
        ? 'bg-[#d97757] text-white shadow-md shadow-[#d97757]/30'
        : 'bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-500 hover:scale-105'
    }`}
  >
    {label}
    {count !== undefined && (
      <span className="ml-1.5 text-xs opacity-75">({count})</span>
    )}
  </button>
));

FilterButton.displayName = 'FilterButton';

// Header Component
function PageHeader({ resourceCount }: { resourceCount: number }) {
  return (
    <div className="mb-10 lg:mb-12">
      <div className="inline-block mb-4">
        <span className="bg-[#d97757]/10 dark:bg-[#d97757]/20 text-[#d97757] px-4 py-2 rounded-full text-sm font-semibold flex items-center space-x-2">
          <Sparkles className="w-4 h-4" />
          <span>Explore Community Resources</span>
        </span>
      </div>
      <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-3 leading-tight">
        Browse All Resources
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
        Discover <span className="font-semibold text-[#d97757]">{resourceCount}</span> study materials shared by our community of students
      </p>
    </div>
  );
}

// Stats Banner Component
function StatsBanner({ resourceCount }: { resourceCount: number }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-10">
      <StatCard icon={FileText} value={resourceCount} label="Total Resources" />
      <StatCard icon={Users} value="500+" label="Contributors" />
      <StatCard icon={Download} value="2.5K" label="Downloads" />
      <StatCard icon={BookOpen} value="8" label="Semesters" />
    </div>
  );
}

// Search Bar Component
function SearchBar({ 
  searchQuery, 
  onSearchChange 
}: { 
  searchQuery: string; 
  onSearchChange: (value: string) => void;
}) {
  return (
    <div className="flex-1 relative group">
      <div className="absolute inset-0 bg-[#d97757]/10 dark:bg-[#d97757]/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="relative bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm rounded-xl shadow-sm dark:shadow-gray-900/20 border border-gray-200/60 dark:border-gray-600/50 group-hover:border-[#d97757]/40 transition-all duration-300">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400 dark:text-gray-500 group-hover:text-[#d97757] transition-colors" />
          </div>
          <input
            type="text"
            placeholder="Search by subject, title, or keyword..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="block w-full pl-12 pr-4 py-3 border-0 bg-transparent text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-[#d97757]/50 focus:outline-none transition-all rounded-xl"
          />
        </div>
      </div>
    </div>
  );
}

// Refine Dropdown Component
function RefineDropdown({
  isOpen,
  onToggle,
  filters,
  semesterCounts,
  onSemesterChange,
  onTypeChange,
  onClearFilters
}: {
  isOpen: boolean;
  onToggle: () => void;
  filters: FilterState;
  semesterCounts: Record<number, number>;
  onSemesterChange: (sem: string) => void;
  onTypeChange: (type: string) => void;
  onClearFilters: () => void;
}) {
  return (
    <div className="relative">
      <button
        onClick={onToggle}
        className="flex items-center space-x-2 px-5 py-3 bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm border border-gray-200/60 dark:border-gray-600/50 rounded-xl shadow-sm dark:shadow-gray-900/20 hover:border-[#d97757] hover:shadow-md dark:hover:shadow-gray-900/40 hover:text-[#d97757] transition-all duration-300 whitespace-nowrap group"
      >
        <SlidersHorizontal className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
        <span className="text-sm font-semibold">Refine</span>
        <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-10" 
            onClick={onToggle}
          />
          <div className="absolute right-0 mt-2 w-80 bg-white/95 dark:bg-gray-700/95 backdrop-blur-md rounded-xl shadow-2xl dark:shadow-gray-900/50 border border-gray-200/60 dark:border-gray-600/50 z-20 overflow-hidden">
            <div className="p-5 space-y-5 max-h-96 overflow-y-auto">
              {/* Filter by Semester */}
              <div>
                <p className="text-xs font-bold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wider flex items-center space-x-2">
                  <span>Semester</span>
                  {filters.semester !== 'all' && (
                    <span className="px-2 py-0.5 bg-[#d97757] text-white text-xs rounded-full">
                      {filters.semester}
                    </span>
                  )}
                </p>
                <div className="flex flex-wrap gap-2">
                  <FilterButton
                    label="All"
                    isActive={filters.semester === 'all'}
                    onClick={() => onSemesterChange('all')}
                  />
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                    <FilterButton
                      key={sem}
                      label={`Sem ${sem}`}
                      isActive={filters.semester === sem.toString()}
                      onClick={() => onSemesterChange(sem.toString())}
                      count={semesterCounts[sem]}
                    />
                  ))}
                </div>
              </div>

              {/* Filter by Type */}
              <div>
                <p className="text-xs font-bold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wider flex items-center space-x-2">
                  <span>Type</span>
                  {filters.type !== 'all' && (
                    <span className="px-2 py-0.5 bg-[#d97757] text-white text-xs rounded-full capitalize">
                      {filters.type}
                    </span>
                  )}
                </p>
                <div className="flex flex-wrap gap-2">
                  <FilterButton
                    label="All"
                    isActive={filters.type === 'all'}
                    onClick={() => onTypeChange('all')}
                  />
                  {['Notes', 'Assignment', 'Quiz', 'Date Sheet', 'Past Papers'].map((type) => (
                    <FilterButton
                      key={type}
                      label={type}
                      isActive={filters.type === type.toLowerCase()}
                      onClick={() => onTypeChange(type.toLowerCase())}
                    />
                  ))}
                </div>
              </div>

              {/* Clear Filters */}
              {hasActiveFilters(filters) && (
                <div className="pt-4 border-t border-gray-200/60 dark:border-gray-600/50">
                  <button
                    onClick={onClearFilters}
                    className="flex items-center space-x-2 text-xs font-semibold text-gray-600 dark:text-gray-400 hover:text-[#d97757] transition-colors group"
                  >
                    <X className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
                    <span>Clear all filters</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// Empty State Component
function EmptyState({ onClearFilters }: { onClearFilters: () => void }) {
  return (
    <div className="bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm rounded-2xl p-12 lg:p-16 text-center shadow-sm dark:shadow-gray-900/20 border border-gray-200/60 dark:border-gray-600/50">
      <div className="relative w-24 h-24 mx-auto mb-6">
        <div className="absolute inset-0 bg-[#d97757] rounded-full blur-2xl opacity-20"></div>
        <div className="relative w-24 h-24 bg-[#d97757]/10 dark:bg-[#d97757]/20 rounded-full flex items-center justify-center">
          <Search className="w-12 h-12 text-[#d97757]" />
        </div>
      </div>
      <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">No Resources Found</h3>
      <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
        Try adjusting your filters or search query to find what you're looking for
      </p>
      <button
        onClick={onClearFilters}
        className="bg-[#d97757] text-white px-8 py-3 rounded-xl hover:bg-[#c66847] transition-all transform hover:scale-105 shadow-lg shadow-[#d97757]/30 font-semibold"
      >
        Clear Filters
      </button>
    </div>
  );
}

// Main Page Component
export default function BrowseResourcesPage() {
  const { resources, error } = useLoaderData<typeof loader>();
  const [filters, setFilters] = useState<FilterState>({
    semester: 'all',
    type: 'all',
    searchQuery: ''
  });
  const [refineCardOpen, setRefineCardOpen] = useState(false);

  // Memoize filtered resources
  const filteredResources = useMemo(() => {
    return filterResources(resources || [], filters);
  }, [resources, filters]);

  // Calculate semester counts
  const semesterCounts = useMemo(() => {
    return calculateSemesterCounts(resources || []);
  }, [resources]);

  // Handlers
  const handleSemesterChange = useCallback((sem: string) => {
    setFilters(prev => ({ ...prev, semester: sem }));
  }, []);

  const handleTypeChange = useCallback((type: string) => {
    setFilters(prev => ({ ...prev, type }));
  }, []);

  const handleSearchChange = useCallback((query: string) => {
    setFilters(prev => ({ ...prev, searchQuery: query }));
  }, []);

  const handleClearFilters = useCallback(() => {
    setFilters({
      semester: 'all',
      type: 'all',
      searchQuery: ''
    });
  }, []);

  const resourceCount = resources?.length || 0;

  return (
    <div className="min-h-screen bg-[#f5f5f0] dark:bg-gray-800 py-8 lg:py-12">
      {/* Background decorations */}
      <div className="fixed top-20 right-10 w-72 h-72 bg-[#d97757] opacity-5 dark:opacity-10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="fixed bottom-20 left-10 w-96 h-96 bg-[#d97757] opacity-5 dark:opacity-10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <PageHeader resourceCount={resourceCount} />
        <StatsBanner resourceCount={resourceCount} />

        {/* Search and Refine */}
        <div className="mb-8 flex flex-col sm:flex-row gap-3">
          <SearchBar 
            searchQuery={filters.searchQuery} 
            onSearchChange={handleSearchChange}
          />
          <RefineDropdown
            isOpen={refineCardOpen}
            onToggle={() => setRefineCardOpen(!refineCardOpen)}
            filters={filters}
            semesterCounts={semesterCounts}
            onSemesterChange={handleSemesterChange}
            onTypeChange={handleTypeChange}
            onClearFilters={handleClearFilters}
          />
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Showing <span className="font-bold text-[#d97757]">{filteredResources.length}</span> of{' '}
              <span className="font-semibold text-gray-900 dark:text-gray-100">{resourceCount}</span> resources
            </p>
          </div>
        </div>

        {/* Resources Grid */}
        {filteredResources.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredResources.map((resource) => (
              <BrowseResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        ) : (
          <EmptyState onClearFilters={handleClearFilters} />
        )}

        {/* Load More Button */}
        {filteredResources.length > 0 && (
          <div className="mt-12 lg:mt-16 text-center">
            <button className="group px-8 py-3.5 bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm border-2 border-gray-300/60 dark:border-gray-600/50 text-gray-700 dark:text-gray-300 rounded-xl hover:border-[#d97757] hover:text-[#d97757] hover:shadow-lg hover:shadow-[#d97757]/20 transition-all duration-300 font-semibold transform hover:scale-105">
              Load More Resources
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
