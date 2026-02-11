import { useState, useMemo, useCallback, useEffect } from 'react';
import { useLoaderData, useFetcher, useSearchParams } from 'react-router';

import { BrowseResourceCard } from '~/components/resources-page-components/BrowseResourceCard';
import { PageHeader } from '~/components/resources-page-components/PageHeader';
import { StatsBanner } from '~/components/resources-page-components/StatsBanner';
import { EmptyState } from '~/components/resources-page-components/EmptyState';
import { LoadMoreButton } from '~/components/resources-page-components/LoadMoreButton';
import { getPaginatedResources, getTotalResourceCount, getTotalUserCount } from '~/utils/resources/resource-pagination.server';
import { 
  calculateSemesterCounts, 
  type FilterState 
} from '~/utils/resources/resource-filters';
import type { TransformedResource } from '~/utils/resources/resource-transform.server';
import { useDebounce } from '~/utils/hooks/use-debounce';

// Loader function
export async function loader({ request }: { request: Request }) {
  try {
    const url = new URL(request.url);
    const cursor = url.searchParams.get('cursor') || undefined;
    const searchQuery = url.searchParams.get('search') || undefined;
    const semester = url.searchParams.get('semester') || undefined;
    const resourceType = url.searchParams.get('type') || undefined;

    const [paginationResult, totalCount, userCount] = await Promise.all([
      getPaginatedResources({
        cursor,
        searchQuery,
        semester: semester ? parseInt(semester, 10) : undefined,
        resourceType: resourceType !== 'all' ? resourceType : undefined
      }),
      getTotalResourceCount(),
      getTotalUserCount()
    ]);

    return {
      resources: paginationResult.items,
      nextCursor: paginationResult.nextCursor,
      hasMore: paginationResult.hasMore,
      totalCount,
      userCount,
      error: null
    };
  } catch (error) {
    return {
      resources: [],
      nextCursor: null,
      hasMore: false,
      totalCount: 0,
      userCount: 0,
      error: 'Something went wrong. Please try again.'
    };
  }
}

// Action function for loading more resources
export async function action({ request }: { request: Request }) {
  try {
    const formData = await request.formData();
    const intent = formData.get('intent');

    if (intent === 'load-more') {
      const cursor = formData.get('cursor') as string | null;
      const searchQuery = formData.get('search') as string | null;
      const semester = formData.get('semester') as string | null;
      const resourceType = formData.get('type') as string | null;

      const result = await getPaginatedResources({
        cursor: cursor || undefined,
        searchQuery: searchQuery || undefined,
        semester: semester ? parseInt(semester, 10) : undefined,
        resourceType: resourceType && resourceType !== 'all' ? resourceType : undefined
      });

      return {
        resources: result.items,
        nextCursor: result.nextCursor,
        hasMore: result.hasMore,
        success: true
      };
    }

    return { success: false, error: 'Invalid action' };
  } catch (error) {
    return { success: false, error: 'Failed to load more resources' };
  }
}

// Main Page Component
export default function BrowseResourcesPage() {
  const loaderData = useLoaderData<typeof loader>();
  const fetcher = useFetcher<typeof action>();
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Handle error messages from URL params (from download redirects)
  const errorParam = searchParams.get('error');
  
  // Error messages mapping
  const errorMessages: Record<string, string> = {
    'invalid-resource': 'Invalid resource ID. Please try again.',
    'resource-not-found': 'Resource not found. It may have been deleted.',
    'file-not-found': 'File not found in storage. The resource may have been removed.',
    'file-read-error': 'Failed to read file. Please try again later.',
    'download-failed': 'Download failed. Please try again later.'
  };

  // Clear error from URL after showing
  useEffect(() => {
    if (errorParam && errorMessages[errorParam]) {
      const params = new URLSearchParams(searchParams);
      params.delete('error');
      setSearchParams(params, { replace: true });
    }
  }, [errorParam, searchParams, setSearchParams]);
  
  // Initialize state from URL params
  const [filters, setFilters] = useState<FilterState>(() => ({
    semester: searchParams.get('semester') || 'all',
    type: searchParams.get('type') || 'all',
    searchQuery: searchParams.get('search') || ''
  }));
  
  // Debounce search query to avoid excessive API calls
  const debouncedSearchQuery = useDebounce(filters.searchQuery, 500);
  
  const [refineCardOpen, setRefineCardOpen] = useState(false);
  const [allResources, setAllResources] = useState<TransformedResource[]>(loaderData.resources);
  const [nextCursor, setNextCursor] = useState<string | null>(loaderData.nextCursor);
  const [hasMore, setHasMore] = useState(loaderData.hasMore);

  // Update resources when loader data changes
  useEffect(() => {
    setAllResources(loaderData.resources);
    setNextCursor(loaderData.nextCursor);
    setHasMore(loaderData.hasMore);
  }, [loaderData.resources, loaderData.nextCursor, loaderData.hasMore]);

  // Update resources when fetcher loads more
  useEffect(() => {
    const data = fetcher.data;
    if (data?.success && data.resources && Array.isArray(data.resources)) {
      setAllResources(prev => [...prev, ...data.resources]);
      setNextCursor(data.nextCursor);
      setHasMore(data.hasMore);
    }
  }, [fetcher.data]);

  // Calculate semester counts from all loaded resources
  const semesterCounts = useMemo(() => {
    return calculateSemesterCounts(allResources);
  }, [allResources]);

  // Update URL params when filters change (using debounced search query)
  useEffect(() => {
    const params = new URLSearchParams();
    
    if (debouncedSearchQuery) {
      params.set('search', debouncedSearchQuery);
    }
    
    if (filters.semester !== 'all') {
      params.set('semester', filters.semester);
    }
    
    if (filters.type !== 'all') {
      params.set('type', filters.type);
    }
    
    setSearchParams(params, { replace: true });
  }, [debouncedSearchQuery, filters.semester, filters.type, setSearchParams]);

  // Handlers
  const handleSemesterChange = useCallback((sem: string) => {
    setFilters(prev => ({ ...prev, semester: sem }));
    setAllResources([]);
  }, []);

  const handleTypeChange = useCallback((type: string) => {
    setFilters(prev => ({ ...prev, type }));
    setAllResources([]);
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
    setAllResources([]);
    setSearchParams({}, { replace: true });
  }, [setSearchParams]);

  const handleLoadMore = useCallback(() => {
    if (!nextCursor || fetcher.state === 'submitting') return;

    const formData = new FormData();
    formData.append('intent', 'load-more');
    formData.append('cursor', nextCursor);
    if (filters.searchQuery) formData.append('search', filters.searchQuery);
    if (filters.semester !== 'all') formData.append('semester', filters.semester);
    if (filters.type !== 'all') formData.append('type', filters.type);

    fetcher.submit(formData, { method: 'POST' });
  }, [nextCursor, filters.searchQuery, filters.semester, filters.type, fetcher.state, fetcher]);

  const isLoadingMore = fetcher.state === 'submitting';

  return (
    <div className="min-h-screen bg-[#f5f5f0] dark:bg-gray-800 py-8 lg:py-12">
      {/* Background decorations */}
      <div className="fixed top-20 right-10 w-72 h-72 bg-[#d97757] opacity-5 dark:opacity-10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="fixed bottom-20 left-10 w-96 h-96 bg-[#d97757] opacity-5 dark:opacity-10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Error Message */}
        {errorParam && errorMessages[errorParam] && (
          <div className="mb-4 p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
            <p className="text-sm font-medium text-red-600 dark:text-red-400">{errorMessages[errorParam]}</p>
          </div>
        )}
        <PageHeader
          resourceCount={loaderData.totalCount}
          filters={filters}
          semesterCounts={semesterCounts}
          refineCardOpen={refineCardOpen}
          onToggleRefine={() => setRefineCardOpen(!refineCardOpen)}
          onSearchChange={handleSearchChange}
          onSemesterChange={handleSemesterChange}
          onTypeChange={handleTypeChange}
          onClearFilters={handleClearFilters}
        />
        
        <StatsBanner resourceCount={loaderData.totalCount} userCount={loaderData.userCount} />

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Showing <span className="font-bold text-[#d97757]">{allResources.length}</span> of{' '}
              <span className="font-semibold text-gray-900 dark:text-gray-100">{loaderData.totalCount}</span> resources
            </p>
          </div>
        </div>

        {/* Resources Grid */}
        {allResources.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {allResources.map((resource) => (
                <BrowseResourceCard key={resource.id} resource={resource} />
              ))}
            </div>

            {hasMore && (
              <LoadMoreButton 
                onClick={handleLoadMore} 
                isLoading={isLoadingMore}
              />
            )}
          </>
        ) : (
          <EmptyState onClearFilters={handleClearFilters} />
        )}
      </div>
    </div>
  );
}
