import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

export async function saveFileLocally(file: File): Promise<{
  filePath: string;
  fileName: string;
  fileSize: number;
}> {
  try {
    // 1. Create unique filename
    const timestamp = Date.now();
    const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, '-'); // Remove special chars
    const fileName = `${timestamp}-${sanitizedName}`;

    // 2. Define upload directory
    const uploadDir = join(process.cwd(), 'public', 'uploads');

    // 3. Create directory if it doesn't exist
    try {
      if (!existsSync(uploadDir)) {
        await mkdir(uploadDir, { recursive: true });
      }
    } catch (mkdirError) {
      const errorMessage = mkdirError instanceof Error ? mkdirError.message : 'Unknown error';
      if (errorMessage.includes('EACCES') || errorMessage.includes('permission')) {
        throw new Error('Permission denied: Cannot create upload directory. Please check storage permissions.');
      }
      throw new Error(`Failed to create upload directory: ${errorMessage}`);
    }

    // 4. Define full file path
    const fullPath = join(uploadDir, fileName);

    // 5. Convert file to buffer
    let fileBuffer: Buffer;
    try {
      fileBuffer = Buffer.from(await file.arrayBuffer());
    } catch (bufferError) {
      throw new Error('Failed to process file. Please try again.');
    }

    // 6. Save file to disk
    try {
      await writeFile(fullPath, fileBuffer);
    } catch (writeError) {
      const errorMessage = writeError instanceof Error ? writeError.message : 'Unknown error';
      
      if (errorMessage.includes('ENOSPC')) {
        throw new Error('Storage full: No space left on device. Please free up space and try again.');
      }
      if (errorMessage.includes('EACCES') || errorMessage.includes('permission')) {
        throw new Error('Permission denied: Cannot write to storage. Please check storage permissions.');
      }
      if (errorMessage.includes('ENOENT')) {
        throw new Error('Storage path not found. Please check storage configuration.');
      }
      throw new Error(`Failed to save file: ${errorMessage}`);
    }

    // 7. Return file info
    return {
      filePath: `/uploads/${fileName}`, // Relative path for database
      fileName: fileName,
      fileSize: file.size,
    };
  } catch (error) {
    // Re-throw with more context if it's already our custom error
    if (error instanceof Error && (
      error.message.includes('Permission denied') ||
      error.message.includes('Storage full') ||
      error.message.includes('Storage path') ||
      error.message.includes('Failed to process')
    )) {
      throw error;
    }
    
    // Wrap unknown errors
    const errorMessage = error instanceof Error ? error.message : 'Unknown storage error';
    throw new Error(`Storage error: ${errorMessage}`);
  }
}

// Optional: Validate file before upload
export function validateFile(file: File): { valid: boolean; error?: string } {
  const MAX_SIZE = 50 * 1024 * 1024; // 50MB
  const ALLOWED_TYPES = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'image/jpeg',
    'image/png',
  ];

  if (file.size > MAX_SIZE) {
    return { valid: false, error: 'File too large. Maximum size is 50MB' };
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    return { valid: false, error: 'Invalid file type. Only PDF, DOCX, JPG, PNG allowed' };
  }

  return { valid: true };
}