import type { Route } from './+types/dashboard';
import { redirect, Form, useActionData, useNavigation, useLoaderData, useFetcher, useSearchParams, useNavigate } from 'react-router';
import { useState, useRef, useEffect, useCallback } from 'react';
import { Upload, X, Plus, Filter, Loader2 } from 'lucide-react';

import { ResourceCard } from '~/components/dashboard-components/ResourceCard';
import { getUserId } from '~/utils/cookie-session/session.server';
import { saveFileLocally, validateFile } from '~/utils/upload-file/file-upload.server';
import { deleteFileSafely } from '~/utils/delete-file/file-delete.server';
import {
  getUserResourceById,
  updateResourcePublishStatus,
  createResource,
  deleteResource,
  getUserSemesterCounts
} from '~/utils/prisma/dashboard-prisma.server';
import { getPaginatedResources } from '~/utils/resources/resource-pagination.server';

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Dashboard" },
    { name: "description", content: "Welcome to Your personal Dashboard!" },
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
  try {
    const userId = await getUserId(request)
    if (!userId) return redirect('/login')

    const url = new URL(request.url);
    const cursor = url.searchParams.get('cursor') || undefined;
    const searchQuery = url.searchParams.get('search') || undefined;
    const semester = url.searchParams.get('semester') || undefined;
    const resourceType = url.searchParams.get('type') || undefined;

    // Get pagination result and semester counts
    const [paginationResult, semesterCounts] = await Promise.all([
      getPaginatedResources({
        cursor,
        searchQuery,
        userId,
        semester: semester ? parseInt(semester, 10) : undefined,
        resourceType: resourceType && resourceType !== 'all' ? resourceType : undefined
      }),
      getUserSemesterCounts(userId)
    ]);

    return {
      resources: paginationResult.items || [],
      nextCursor: paginationResult.nextCursor,
      hasMore: paginationResult.hasMore,
      semesterCounts: semesterCounts || {},
      error: null
    }
  } catch (error) {
    // Check if it's a database connection error
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const isDatabaseError = errorMessage.includes('connect') || 
                           errorMessage.includes('timeout') || 
                           errorMessage.includes('ECONNREFUSED') ||
                           errorMessage.includes('Prisma');

    return {
      resources: [],
      nextCursor: null,
      hasMore: false,
      semesterCounts: {},
      error: isDatabaseError 
        ? 'Database connection failed. Please check your connection and try again.'
        : 'Failed to load resources. Please try again later.'
    }
  }
}

export async function action({ request }: Route.ActionArgs) {
  try {
    const userId = await getUserId(request)
    if (!userId) return redirect('/login')

    const data = await request.formData()
    const intent = data.get('intent')

    // Handle load more
    if (intent === 'load-more') {
      const cursor = data.get('cursor') as string | null;
      const searchQuery = data.get('search') as string | null;
      const semester = data.get('semester') as string | null;
      const resourceType = data.get('type') as string | null;

      try {
        // Get pagination result
        const result = await getPaginatedResources({
          cursor: cursor || undefined,
          searchQuery: searchQuery || undefined,
          userId,
          semester: semester ? parseInt(semester, 10) : undefined,
          resourceType: resourceType && resourceType !== 'all' ? resourceType : undefined
        });

        return {
          resources: result.items || [],
          nextCursor: result.nextCursor,
          hasMore: result.hasMore,
          success: true
        };
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        const isDatabaseError = errorMessage.includes('connect') || 
                              errorMessage.includes('timeout') || 
                              errorMessage.includes('ECONNREFUSED');
        
        return { 
          success: false,
          error: isDatabaseError 
            ? 'Database connection failed. Please try again.'
            : 'Failed to load more resources. Please try again.'
        };
      }
    }

    // Handle publish/unpublish
    if (intent === 'publish' || intent === 'unpublish') {
      const resourceId = data.get('resourceId')
      if (!resourceId) return { error: 'Resource ID is required' }

      const resource = await getUserResourceById(Number(resourceId), userId)
      if (!resource) return { error: 'Resource not found' }

      try {
        await updateResourcePublishStatus(Number(resourceId), intent === 'publish')
        return { success: true }
      } catch (dbError) {
        const errorMessage = dbError instanceof Error ? dbError.message : 'Unknown error';
        const isDatabaseError = errorMessage.includes('connect') || 
                              errorMessage.includes('timeout') || 
                              errorMessage.includes('ECONNREFUSED');
        
        return { 
          error: isDatabaseError 
            ? 'Database connection failed. Please try again.'
            : 'Failed to update resource status. Please try again.'
        };
      }
    }

    // Handle download
    if (intent === 'download') {
      const resourceId = data.get('resourceId')
      if (!resourceId) return { error: 'Resource ID is required' }

      try {
        // Verify user owns the resource
        const resource = await getUserResourceById(Number(resourceId), userId);
        if (!resource) {
          return { error: 'Resource not found or you do not have permission to download it.' };
        }

        // Check if file exists in storage
        const { fileExists } = await import('~/utils/download/download-helpers.server');
        if (!fileExists(resource.file_path)) {
          return { error: 'File not found in storage. The file may have been deleted.' };
        }

        // File exists, increment download count and return success
        const { incrementResourceDownload } = await import('~/utils/prisma/resource-prisma.server');
        await incrementResourceDownload(Number(resourceId));
        
        // Return download URL for client to handle
        return { 
          success: true, 
          downloadUrl: `/download/${resourceId}` 
        };
      } catch (error) {
        console.error('Download error:', error);
        return { error: 'Failed to process download. Please try again.' };
      }
    }

    // Handle delete
    if (intent === 'delete') {
      const resourceId = data.get('resourceId')
      if (!resourceId) return { error: 'Resource ID is required' }

      const resource = await getUserResourceById(Number(resourceId), userId)
      if (!resource) return { error: 'Resource not found' }

      // Try to delete file from storage (non-blocking)
      const fileDeleted = await deleteFileSafely(resource.file_path)
      if (!fileDeleted) {
        console.warn(`Failed to delete file ${resource.file_path} from storage, but continuing with database deletion`);
      }

      // Delete from database (always attempt, even if file deletion failed)
      try {
        await deleteResource(Number(resourceId))
        return { success: true }
      } catch (dbError) {
        const errorMessage = dbError instanceof Error ? dbError.message : 'Unknown error';
        const isDatabaseError = errorMessage.includes('connect') || 
                              errorMessage.includes('timeout') || 
                              errorMessage.includes('ECONNREFUSED');
        
        return { 
          error: isDatabaseError 
            ? 'Database connection failed. Resource may still exist. Please try again.'
            : 'Failed to delete resource. Please try again.'
        };
      }
    }

    // Handle upload
    const title = data.get('title')
    const semester = data.get('semester')
    const subject = data.get('subject')
    const resource_type = data.get('resource_type')
    const file = data.get('file') as File

    if (!title || !semester || !subject || !resource_type || !file) {
      return ({ error: 'All fields are required' })
    }

    if (!file || file.size === 0) {
      return ({ error: 'Please select a file to upload' })
    }

    const { valid, error } = validateFile(file as File)
    if (!valid) return ({ error: error as string })

    // Save file to local storage with error handling
    let filePath: string;
    let fileSize: number;
    
    try {
      const fileResult = await saveFileLocally(file as File);
      filePath = fileResult.filePath;
      fileSize = fileResult.fileSize;
    } catch (storageError) {
      const { getStorageErrorMessage } = await import('~/utils/storage/storage-error-handler.server');
      return { 
        error: getStorageErrorMessage(storageError)
      };
    }

    // Create resource in database with error handling
    let resource;
    try {
      resource = await createResource({
        title: title as string,
        semester: Number(semester),
        subject: subject as string,
        resource_type: resource_type as string,
        file_path: filePath,
        file_size: BigInt(fileSize),
        user_id: userId as number,
      });
    } catch (dbError) {
      // If database creation fails, try to clean up the uploaded file
      try {
        const { deleteFileSafely } = await import('~/utils/delete-file/file-delete.server');
        await deleteFileSafely(filePath);
      } catch (cleanupError) {
        console.error('Failed to cleanup file after database error:', cleanupError);
      }
      
      const errorMessage = dbError instanceof Error ? dbError.message : 'Unknown database error';
      const isDatabaseError = errorMessage.includes('connect') || 
                              errorMessage.includes('timeout') || 
                              errorMessage.includes('ECONNREFUSED') ||
                              errorMessage.includes('Prisma');
      
      return { 
        error: isDatabaseError 
          ? 'Database connection failed. File was not saved. Please try again.'
          : 'Failed to create resource. Please try again.'
      };
    }

    if (!resource) {
      // Clean up file if resource creation failed
      try {
        const { deleteFileSafely } = await import('~/utils/delete-file/file-delete.server');
        await deleteFileSafely(filePath);
      } catch (cleanupError) {
        console.error('Failed to cleanup file after resource creation failure:', cleanupError);
      }
      return ({ error: 'Failed to create resource. Please try again.' });
    }
    
    return redirect('/user/dashboard')
  } catch (error) {
    const { getStorageErrorMessage, isStorageError } = await import('~/utils/storage/storage-error-handler.server');
    return ({ 
      error: isStorageError(error)
        ? getStorageErrorMessage(error)
        : 'Failed to process request. Please try again.'
    })
  }
}

export default function Dashboard() {
  const actionData = useActionData<typeof action>();
  const loaderData = useLoaderData<typeof loader>();
  const fetcher = useFetcher<typeof action>();
  const navigation = useNavigation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Initialize state
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const prevNavigationState = useRef<string>(navigation.state);
  const isSubmitting = navigation.state === 'submitting';

  // Get resource type from URL
  const resourceType = searchParams.get('type') || null;

  // Initialize state for resources
  const [allResources, setAllResources] = useState(loaderData.resources);
  const [nextCursor, setNextCursor] = useState<string | null>(loaderData.nextCursor);
  const [hasMore, setHasMore] = useState(loaderData.hasMore);

  // Update resources when loader data changes
  useEffect(() => {
    setAllResources(loaderData.resources);
    setNextCursor(loaderData.nextCursor);
    setHasMore(loaderData.hasMore);
  }, [loaderData]);

  // Update resources when fetcher loads more
  useEffect(() => {
    const data = fetcher.data;
    if (data?.success && data.resources && Array.isArray(data.resources)) {
      setAllResources(prev => [...prev, ...data.resources]);
      setNextCursor(data.nextCursor);
      setHasMore(data.hasMore);
    } else if (data?.success === false && data?.error) {
      // Handle load-more errors
      console.error('Failed to load more resources:', data.error);
    }
  }, [fetcher.data]);

  // Expose semester counts to layout via window (temporary solution)
  useEffect(() => {
    (window as any).dashboardSemesterCounts = loaderData.semesterCounts;
    return () => {
      delete (window as any).dashboardSemesterCounts;
    };
  }, [loaderData.semesterCounts]);

  // Handle load more
  const handleLoadMore = useCallback(() => {
    if (!nextCursor || fetcher.state === 'submitting') return;
    
    const formData = new FormData();
    formData.append('intent', 'load-more');
    formData.append('cursor', nextCursor);
    
    const searchQuery = searchParams.get('search');
    const semester = searchParams.get('semester');
    const type = searchParams.get('type');
    
    if (searchQuery) formData.append('search', searchQuery);
    if (semester) formData.append('semester', semester);
    if (type && type !== 'all') formData.append('type', type);
    
    fetcher.submit(formData, { method: 'POST' });
  }, [nextCursor, searchParams, fetcher]);

  // Handle close modal after successful upload
  useEffect(() => {
    const wasSubmitting = prevNavigationState.current === 'submitting';
    const isNowIdle = navigation.state === 'idle';
    const isNowLoading = navigation.state === 'loading';
    
    if (wasSubmitting && (isNowIdle || isNowLoading) && !actionData?.error && uploadModalOpen) {
      setUploadModalOpen(false);
      setSelectedFile(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
    prevNavigationState.current = navigation.state;
  }, [navigation.state, actionData?.error, uploadModalOpen]);

  const handleFileSelect = useCallback((file: File | null) => {
    setSelectedFile(file);
    if (file && fileInputRef.current) {
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);
      fileInputRef.current.files = dataTransfer.files;
    }
  }, []);

  // Handle drag and drop
  const handleDragDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      try {
        handleFileSelect(file);
      } catch (error) {
        console.error('Error handling dropped file:', error);
      }
    }
  }, [handleFileSelect]);

  // Handle resource type change
  const handleResourceTypeChange = useCallback((type: string | null) => {
    const params = new URLSearchParams(searchParams);
    if (type && type !== 'all') {
      params.set('type', type);
    } else {
      params.delete('type');
    }
    navigate(`?${params.toString()}`, { replace: true });
  }, [searchParams, navigate]);


  const semesterOptions = [1, 2, 3, 4, 5, 6, 7, 8];

  // Filter options
  const filterOptions = [
    { label: 'All Types', value: null, icon: Filter },
    { label: 'Notes', value: 'Notes' },
    { label: 'Assignments', value: 'Assignments' },
    { label: 'Quizzes', value: 'Quizzes' },
  ];

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">My Resources</h2>
          <p className="text-gray-600 dark:text-gray-300 mt-1">Manage and organize your uploaded materials</p>
        </div>
        <button
          onClick={() => setUploadModalOpen(true)}
          className="flex items-center justify-center gap-2 bg-[#d97757] text-white px-5 py-2.5 rounded-lg hover:bg-[#c66847] transition-colors duration-200 font-medium text-sm shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#d97757]/50 focus:ring-offset-2"
        >
          <Plus className="w-4 h-4" />
          <span>Upload Resource</span>
        </button>
      </div>


      {/* Show error message if there is an error */}
      {loaderData.error ? (
        <div className="bg-white dark:bg-gray-700 rounded-xl p-12 text-center">
          <div className="w-20 h-20 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">Unable to Load Resources</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-md mx-auto">{loaderData.error}</p>
          <div className="flex gap-3 justify-center">
            <button 
              onClick={() => window.location.reload()} 
              className="bg-[#d97757] text-white px-6 py-3 rounded-lg hover:bg-[#c66847] transition-all font-medium"
            >
              Retry
            </button>
            <button 
              onClick={() => navigate('/user/dashboard')} 
              className="bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition-all font-medium"
            >
              Refresh Page
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex flex-wrap gap-3 mb-6">
            {filterOptions.map((option) => {
              const isActive = resourceType === option.value;
              const Icon = option.icon;
              return (
                <button
                  key={option.label}
                  onClick={() => handleResourceTypeChange(option.value)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors text-sm font-medium ${
                    isActive
                      ? 'bg-[#d97757]/15 dark:bg-[#d97757]/25 text-[#d97757] dark:text-[#c66847] border-[#d97757]/30 dark:border-[#d97757]/40'
                      : 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 hover:border-[#d97757]/50 hover:text-[#d97757] text-gray-900 dark:text-gray-100'
                  }`}
                >
                  {Icon && <Icon className="w-4 h-4" />}
                  <span>{option.label}</span>
                </button>
              );
            })}
          </div>

          {/* Show resources or empty state */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allResources.length > 0 ? (
              allResources.map((resource: any) => (
                <ResourceCard key={resource.Id} resource={resource} />
              ))
            ) : (
              <div className="bg-white dark:bg-gray-700 rounded-xl p-12 text-center col-span-full">
                <div className="w-20 h-20 bg-[#d97757]/10 dark:bg-[#d97757]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Upload className="w-10 h-10 text-[#d97757]" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                  {resourceType ? `No ${resourceType} Found` : 'No Resources Yet'}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-md mx-auto">
                  {resourceType 
                    ? `No resources match your current filter. Try selecting a different filter or upload a new ${resourceType.toLowerCase()} resource.`
                    : 'You haven\'t uploaded any resources yet. Start sharing your study materials with your classmates!'}
                </p>
                <button
                  onClick={() => setUploadModalOpen(true)}
                  className="bg-[#d97757] text-white px-6 py-3 rounded-lg hover:bg-[#c66847] transition-colors duration-200 font-medium shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#d97757]/50 focus:ring-offset-2">
                  {resourceType ? `Upload ${resourceType}` : 'Upload Your First Resource'}
                </button>
              </div>
            )}
          </div>

          {/* Show load more button if there are more resources */}
          {hasMore && (
            <div className="mt-8 text-center">
              {fetcher.data?.success === false && fetcher.data?.error && (
                <div className="mb-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 max-w-md mx-auto">
                  <p className="text-red-600 dark:text-red-400 text-sm font-medium">{fetcher.data.error}</p>
                </div>
              )}
              <button
                onClick={handleLoadMore}
                disabled={fetcher.state === 'submitting'}
                className="px-8 py-3 bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:border-[#d97757] hover:text-[#d97757] transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mx-auto"
              >
                {fetcher.state === 'submitting' ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Loading...</span>
                  </>
                ) : (
                  <span>Load More Resources</span>
                )}
              </button>
            </div>
          )}
        </>
      )}

      {/* Show upload modal if it is open */}
      {uploadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 dark:bg-gray-900/70 backdrop-blur-sm" onClick={() => setUploadModalOpen(false)}>
          <div className="bg-white dark:bg-gray-700 rounded-2xl shadow-2xl max-w-2xl w-full p-8" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Upload Resource</h3>
              <button onClick={() => setUploadModalOpen(false)} className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
                <X className="w-6 h-6" />
              </button>
            </div>


            {/* Show error message from resource modal if there is an error */}
            {actionData?.error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 mb-6">
                <p className="text-red-600 dark:text-red-400 text-sm font-medium">{actionData.error}</p>
              </div>
            )}

            <Form method="post" encType="multipart/form-data" className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">Semester</label>
                <select name='semester' className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-600 rounded-lg focus:ring-2 focus:ring-[#d97757] focus:border-[#d97757] outline-none text-gray-900 dark:text-gray-100">
                  <option value="">Select Semester</option>
                  {semesterOptions.map((sem) => (
                    <option key={sem} value={sem}>Semester {sem}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">Subject Name</label>
                <input type="text" name='subject' placeholder="e.g., Data Structures" className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-600 rounded-lg focus:ring-2 focus:ring-[#d97757] focus:border-[#d97757] outline-none text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-400" />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">Resource Type</label>
                <select name='resource_type' className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-600 rounded-lg focus:ring-2 focus:ring-[#d97757] focus:border-[#d97757] outline-none text-gray-900 dark:text-gray-100">
                  <option>Select Type</option>
                  <option>Notes</option>
                  <option>Assignment</option>
                  <option>Quiz</option>
                  <option>Date Sheet</option>
                  <option>Syllabus</option>
                  <option>Past Papers</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">Resource Title</label>
                <input type="text" name='title' placeholder="e.g., Complete Chapter 3 Notes" className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-600 rounded-lg focus:ring-2 focus:ring-[#d97757] focus:border-[#d97757] outline-none text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-400" />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">Upload File</label>
                <div
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
                  onDrop={handleDragDrop}
                  className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center hover:border-[#d97757] transition-colors cursor-pointer"
                >
                  <Upload className="w-8 h-8 text-gray-400 dark:text-gray-500 mx-auto mb-2" />
                  {selectedFile ? (
                    <>
                      <p className="text-sm text-gray-900 dark:text-gray-100 mb-1 font-medium">{selectedFile.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{(selectedFile.size / (1024 * 1024)).toFixed(2)} MB</p>
                    </>
                  ) : (
                    <>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">Click to upload or drag and drop</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">PDF, DOCX, JPG, PNG (Max 50MB)</p>
                    </>
                  )}
                  <input 
                    ref={fileInputRef} 
                    type="file" 
                    name='file' 
                    accept='.pdf,.docx,.jpg,.png' 
                    onChange={(e) => handleFileSelect(e.target.files?.[0] || null)} 
                    className="hidden" 
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <button type="submit" disabled={isSubmitting} className="w-full bg-[#d97757] text-white py-3 rounded-lg hover:bg-[#c66847] transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed">
                  {isSubmitting ? 'Uploading...' : 'Upload Resource'}
                </button>
              </div>
            </Form>
          </div>
        </div>
      )}
    </>
  );
}
