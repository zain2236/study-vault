import type { Route } from './+types/download.$id';
import { redirect } from 'react-router';
import { readFile } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';
import { incrementResourceDownload } from '~/utils/prisma/resource-prisma.server';

function getMimeType(filePath: string): string {
  const ext = filePath.substring(filePath.lastIndexOf('.')).toLowerCase();
  const mimeTypes: Record<string, string> = {
    '.pdf': 'application/pdf',
    '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    '.doc': 'application/msword',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
  };
  return mimeTypes[ext] || 'application/octet-stream';
}

export async function loader({ params }: Route.LoaderArgs) {
  try {
    const resourceId = Number((params as { id?: string })?.id);
    
    if (!resourceId || isNaN(resourceId)) {
      return redirect('/user/dashboard');
    }

    const resource = await incrementResourceDownload(resourceId);

    if (!resource) {
      return redirect('/user/dashboard');
    }

    const filePath = join(process.cwd(), 'public', resource.file_path);
    
    if (!existsSync(filePath)) {
      return redirect('/user/dashboard');
    }

    const fileBuffer = await readFile(filePath);
    const fileExtension = resource.file_path.substring(resource.file_path.lastIndexOf('.'));
    const sanitizedTitle = resource.title.replace(/[^a-zA-Z0-9.-]/g, '-');
    const fileName = `${sanitizedTitle}${fileExtension}`;

    return new Response(fileBuffer, {
      headers: {
        'Content-Type': getMimeType(resource.file_path),
        'Content-Disposition': `attachment; filename="${fileName}"`,
        'Content-Length': fileBuffer.length.toString(),
      },
    });
  } catch (error) {
    return redirect('/user/dashboard');
  }
}
