import type { Route } from './+types/dashboard';
import { redirect, Form, useActionData, useNavigation, useLoaderData } from 'react-router';
import { useState, useRef, useEffect, useCallback, useMemo } from 'react';

import {
  Upload,
  X,
  Plus,
  Filter,
} from 'lucide-react';

import { ResourceCard } from '~/components/dashboard-components/ResourceCard';
import { getUserId } from '~/utils/cookie-session/session.server';
import prisma from '~/utils/prisma/prisma.server';
import { saveFileLocally, validateFile } from '~/utils/upload-file/file-upload.server';

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Dashboard" },
    { name: "description", content: "Welcome to Your personal Dashboard!" },
  ];
}

// Check if user is logged in and get the resources
export async function loader({ request }: Route.LoaderArgs) {
  try{
    const userId = await getUserId(request)
    if (!userId) {
      return redirect('/login')
    }
  
    const resources = await prisma.resource.findMany({ where: { user_id: userId } })
    return { resources: resources || [], error: null }
  }
   catch(error) {
    return { resources: [], error: 'Something went wrong. Please try again.' }
  }
}

export async function action({ request }: Route.ActionArgs) {
  try {
    const userId = await getUserId(request)
    const data = await request.formData()
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
    // Validate file
    const { valid, error } = validateFile(file as File)
    if (!valid) {
      return ({ error: error as string })
    }

    // Upload file to local storage
    const { filePath, fileSize } = await saveFileLocally(file as any)

    // Create resource record in database
    const resource = await prisma.resource.create({
      data: {
        title: title as string,
        semester: Number(semester),
        subject: subject as string,
        resource_type: resource_type as string,
        file_path: filePath,
        file_size: BigInt(fileSize),
        user_id: userId as number,
      }
    })

    if (!resource) {
      return ({ error: 'Failed to create resource' })
    }

    return redirect('/user/dashboard')
  } catch (error) {
    return ({ error: 'Failed to upload resource' })
  }
}

export default function Dashboard() {
  const actionData = useActionData<typeof action>();
  const { resources, error } = useLoaderData<typeof loader>();
  const navigation = useNavigation();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const prevNavigationState = useRef<string>(navigation.state);
  const isSubmitting = navigation.state === 'submitting';

  // Memoize semester options to avoid recreating on every render
  const semesterOptions = useMemo(() => [1, 2, 3, 4, 5, 6, 7, 8], []);

  // Filter resources based on selected filter
  const filteredResources = useMemo(() => {
    if (!selectedFilter) {
      return resources;
    }
    // Normalize filter value to match resource_type (handle plural/singular and case differences)
    const filterMap: Record<string, string> = {
      'Notes': 'Notes',
      'Assignments': 'Assignment',
      'Quizzes': 'Quiz',
    };
    const normalizedFilter = filterMap[selectedFilter] || selectedFilter;
    // Case-insensitive comparison to handle variations
    return resources?.filter(resource => 
      resource.resource_type.toLowerCase() === normalizedFilter.toLowerCase()
    );
  }, [resources, selectedFilter]);

  // Close modal when form submission is successful
  useEffect(() => {

    const wasSubmitting = prevNavigationState.current === 'submitting';
    const isNowIdle = navigation.state === 'idle';
    const isNowLoading = navigation.state === 'loading';

  
    if (wasSubmitting && (isNowIdle || isNowLoading) && !actionData?.error && uploadModalOpen) {
      setUploadModalOpen(false);
      setSelectedFile(null);

      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
    
    prevNavigationState.current = navigation.state;
  }, [navigation.state, actionData?.error, uploadModalOpen]);

  // Memoize event handlers to prevent unnecessary re-renders
  const handleFileInputClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    // Get the file from the drag and drop event
    const file = e.dataTransfer.files?.[0];
    if (file && fileInputRef.current) {
      setSelectedFile(file);
      // Create a new FileList and assign it
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);
      fileInputRef.current.files = dataTransfer.files;
    }
  }, []);

  const handleOpenModal = useCallback(() => {
    setUploadModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setUploadModalOpen(false);
  }, []);

  // Handle filter selection
  const handleFilterClick = useCallback((filterType: string | null) => {
    setSelectedFilter(filterType);
  }, []);

  // Memoize Filters JSX with active state
  const filtersJSX = useMemo(() => {
    const filterOptions = [
      { label: 'All Types', value: null, icon: Filter },
      { label: 'Notes', value: 'Notes' },
      { label: 'Assignments', value: 'Assignments' },
      { label: 'Quizzes', value: 'Quizzes' },
    ];

    return (
      <div className="flex flex-wrap gap-3 mb-6">
        {filterOptions.map((option) => {
          const isActive = selectedFilter === option.value;
          const Icon = option.icon;
          return (
            <button
              key={option.label}
              onClick={() => handleFilterClick(option.value)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors text-sm font-medium ${
                isActive
                  ? 'bg-[#d97757] text-white border-[#d97757]'
                  : 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 hover:border-[#d97757] hover:text-[#d97757] text-gray-900 dark:text-gray-100'
              }`}
            >
              {Icon && <Icon className="w-4 h-4" />}
              <span>{option.label}</span>
            </button>
          );
        })}
      </div>
    );
  }, [selectedFilter, handleFilterClick]);

  return (
    <>
      {/* Header with Upload Button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">My Resources</h2>
          <p className="text-gray-600 dark:text-gray-300 mt-1">Manage and organize your uploaded materials</p>
        </div>

        <button
          onClick={handleOpenModal}
          className="flex items-center justify-center space-x-2 bg-[#d97757] cursor-pointer text-white px-6 py-3 rounded-lg hover:bg-[#c66847] transition-all transform hover:scale-105 shadow-lg"
        >
          <Plus className="w-5 h-5" />
          <span className="font-semibold">Upload Resource</span>
        </button>
      </div>

      {/* Error State */}
      {error ? (
        <div className="bg-white dark:bg-gray-700 rounded-xl p-12 text-center">
          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">Something Went Wrong</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">{error}</p>
          <button onClick={() => window.location.reload()} className="bg-[#d97757] text-white px-6 py-3 rounded-lg hover:bg-[#c66847] transition-all">
            Try Again
          </button>
        </div>
      ) : (
        <>
          {/* Filters */}
          {filtersJSX}

          {/* Resources Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources?.length && filteredResources?.length > 0 ? filteredResources?.map((resource) => (
                <ResourceCard key={resource.Id} resource={resource} />

            )) : <div className="bg-white dark:bg-gray-700 rounded-xl p-12 text-center col-span-full">
              <div className="w-20 h-20 bg-[#d97757]/10 dark:bg-[#d97757]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Upload className="w-10 h-10 text-[#d97757]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                {selectedFilter ? `No ${selectedFilter} Found` : 'No Resources Yet'}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {selectedFilter 
                  ? `Try selecting a different filter or upload a new ${selectedFilter.toLowerCase()} resource`
                  : 'Start uploading your study materials to help your classmates'}
              </p>
              <button
                onClick={handleOpenModal}
                className="bg-[#d97757] text-white px-6 py-3 rounded-lg cursor-pointer hover:bg-[#c66847] transition-all">
                Upload Your First Resource
              </button>
            </div>}
          </div>
        </>
      )}

      {/* Upload Modal */}
      {uploadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 dark:bg-gray-900/70 backdrop-blur-sm" onClick={handleCloseModal}>
          <div className="bg-white dark:bg-gray-700 rounded-2xl shadow-2xl max-w-2xl w-full p-8" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Upload Resource</h3>
              <button onClick={handleCloseModal} className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Error Message */}
            {actionData?.error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 mb-6">
                <p className="text-red-600 dark:text-red-400 text-sm font-medium">{actionData.error}</p>
              </div>
            )}

            <Form method="post"  encType="multipart/form-data" className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Semester Dropdown */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  Semester
                </label>
                <select
                  name='semester'
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-600 rounded-lg focus:ring-2 focus:ring-[#d97757] focus:border-[#d97757] outline-none text-gray-900 dark:text-gray-100">
                  <option value="">Select Semester</option>
                  {semesterOptions.map((sem) => (
                    <option key={sem} value={sem}>
                      Semester {sem}
                    </option>
                  ))}
                </select>
              </div>

              {/* Subject Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  Subject Name
                </label>
                <input
                  type="text"
                  name='subject'
                  placeholder="e.g., Data Structures"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-600 rounded-lg focus:ring-2 focus:ring-[#d97757] focus:border-[#d97757] outline-none text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-400"
                />
              </div>

              {/* Resource Type */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  Resource Type
                </label>
                <select
                  name='resource_type'
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-600 rounded-lg focus:ring-2 focus:ring-[#d97757] focus:border-[#d97757] outline-none text-gray-900 dark:text-gray-100">
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
                <label className="block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  Resource Title
                </label>
                <input
                  type="text"
                  name='title'
                  placeholder="e.g., Complete Chapter 3 Notes"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-600 rounded-lg focus:ring-2 focus:ring-[#d97757] focus:border-[#d97757] outline-none text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-400"
                />
              </div>

              {/* File Upload */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  Upload File
                </label>
                <div
                  onClick={handleFileInputClick}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
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
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="md:col-span-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#d97757] text-white py-3 rounded-lg hover:bg-[#c66847] transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
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