import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

export async function saveFileLocally(file: File): Promise<{
  filePath: string;
  fileName: string;
  fileSize: number;
}> {
  // 1. Create unique filename
  const timestamp = Date.now();
  const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, '-'); // Remove special chars
  const fileName = `${timestamp}-${sanitizedName}`;

  // 2. Define upload directory
  const uploadDir = join(process.cwd(), 'public', 'uploads');

  // 3. Create directory if it doesn't exist
  if (!existsSync(uploadDir)) {
    await mkdir(uploadDir, { recursive: true });
  }

  // 4. Define full file path
  const fullPath = join(uploadDir, fileName);

  // 5. Convert file to buffer
  const fileBuffer = Buffer.from(await file.arrayBuffer());

  // 6. Save file to disk
  await writeFile(fullPath, fileBuffer);

  // 7. Return file info
  return {
    filePath: `/uploads/${fileName}`, // Relative path for database
    fileName: fileName,
    fileSize: file.size,
  };
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