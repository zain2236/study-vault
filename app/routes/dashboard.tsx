import type { Route } from './+types/dashboard';
import { redirect, Form, useActionData, useNavigation, useLoaderData } from 'react-router';
import { useState, useRef } from 'react';
import { join } from 'path';
import { Buffer } from 'buffer';
import { writeFile } from 'fs/promises';

import { 
  Upload, 
  X,
  Plus,
  Filter,
} from 'lucide-react';

import { ResourceCard } from '~/components/dashboard-components/ResourceCard';
import { getUserId } from '~/utils/cookie-session/session.server';
import prisma from '~/utils/prisma/prisma.server';

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Dashboard" },
    { name: "description", content: "Welcome to Your personal Dashboard!" },
  ];
}

export async function loader({request} : Route.LoaderArgs) {
  const userId =  await getUserId(request)
  if(!userId){
    return redirect('/login')
  }

  const resources = await prisma.resource.findMany({where : {user_id : userId}})
  if(!resources){
    return { resources : [] }
  }

  return { resources : resources }
}

export async function action({request} : Route.ActionArgs) {
  const userId =  await getUserId(request)
  const data = await request.formData() 
  const title = data.get('title')
  const semester = data.get('semester')
  const subject = data.get('subject')
  const resource_type = data.get('resource_type')
  const file = data.get('file') as File

  if(!title || !semester || !subject || !resource_type || !file){
    return ({error: 'All fields are required'})
  }
  
  try {
    // Check if file size is less than 50MB
      if(file.size > 50 * 1024 * 1024){ return ({error: 'File size must be less than 50MB'}) }

      // Generate file name
      const timeStamp = Date.now()
      const originalName = file.name.replace(/\s+/g, '-'); 
      const fileName = `${timeStamp}-${originalName}`
      console.log("file name : ", fileName)

      // Create upload directory path
      const uploadDir = join(process.cwd() , 'public' , 'uploads')
      const filePath = join(uploadDir , fileName )

     // 7. Convert file to buffer and save to disk
  const fileBuffer = Buffer.from(await file.arrayBuffer());
  await writeFile(filePath, fileBuffer);

      // 8. Create resource record in database
      const resource = await prisma.resource.create({
        data : {
          title : title as string,
          semester : Number(semester),
          resource_type : resource_type as string,
          file_path : `/uploads/${fileName}`,
          file_size :BigInt(file.size),
          user_id : userId as number,
        }
      })
      
      if(!resource){
        return ({error: 'Failed to create resource'})
      }

      return redirect('/user/dashboard')
  } catch (error) {
    return ({error: 'Failed to upload resource'})
  }
}

export default function Dashboard() {
  const actionData = useActionData<typeof action>();
  const {resources} = useLoaderData<typeof loader>();
  const navigation = useNavigation();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const isSubmitting = navigation.state === 'submitting';


 console.log("resources : ", resources)

  // Handle file input click
  const handleFileInputClick = () => {
    fileInputRef.current?.click();
  };

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  // Handle drag and drop
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files?.[0];
    if (file && fileInputRef.current) {
      setSelectedFile(file);
      // Create a new FileList and assign it
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);
      fileInputRef.current.files = dataTransfer.files;
    }
  };

  const Filters = () => (
    <div className="flex flex-wrap gap-3 mb-6">
      <button className="flex items-center space-x-2 px-4 py-2 bg-white dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600 hover:border-[#d97757] transition-colors text-gray-900 dark:text-gray-100">
        <Filter className="w-4 h-4" />
        <span className="text-sm font-medium">All Types</span>
      </button>
      <button className="px-4 py-2 bg-white dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600 hover:border-[#d97757] hover:text-[#d97757] transition-colors text-sm font-medium text-gray-900 dark:text-gray-100">
        Notes
      </button>
      <button className="px-4 py-2 bg-white dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600 hover:border-[#d97757] hover:text-[#d97757] transition-colors text-sm font-medium text-gray-900 dark:text-gray-100">
        Assignments
      </button>
      <button className="px-4 py-2 bg-white dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600 hover:border-[#d97757] hover:text-[#d97757] transition-colors text-sm font-medium text-gray-900 dark:text-gray-100">
        Quizzes
      </button>
    </div>
  );

  return (
    <>
      {/* Header with Upload Button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">My Resources</h2>
              <p className="text-gray-600 dark:text-gray-300 mt-1">Manage and organize your uploaded materials</p>
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
            {resources.length > 0 ?  resources.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />

            )) : <div className="bg-white dark:bg-gray-700 rounded-xl p-12 text-center">
                <div className="w-20 h-20 bg-[#d97757]/10 dark:bg-[#d97757]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Upload className="w-10 h-10 text-[#d97757]" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">No Resources Yet</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">Start uploading your study materials to help your classmates</p>
                <button className="bg-[#d97757] text-white px-6 py-3 rounded-lg hover:bg-[#c66847] transition-all">
                  Upload Your First Resource
                </button>
            </div>}
          </div>

      {/* Upload Modal */}
      {uploadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 dark:bg-gray-900/70 backdrop-blur-sm" onClick={() => setUploadModalOpen(false)}>
          <div className="bg-white dark:bg-gray-700 rounded-2xl shadow-2xl max-w-2xl w-full p-8" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Upload Resource</h3>
              <button onClick={() => setUploadModalOpen(false)} className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Error Message */}
            {actionData?.error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 mb-6">
                <p className="text-red-600 dark:text-red-400 text-sm font-medium">{actionData.error}</p>
              </div>
            )}

            <Form method="post" encType="multipart/form-data" className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Semester Dropdown */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  Semester
                </label>
                <select
                name='semester' 
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-600 rounded-lg focus:ring-2 focus:ring-[#d97757] focus:border-[#d97757] outline-none text-gray-900 dark:text-gray-100">
                  <option value="">Select Semester</option>
                  <option value="1">Semester 1</option>
                  <option value="2">Semester 2</option>
                  <option value="3">Semester 3</option>
                  <option value="4">Semester 4</option>
                  <option value="5">Semester 5</option>
                  <option value="6">Semester 6</option>
                  <option value="7">Semester 7</option>
                  <option value="8">Semester 8</option>
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