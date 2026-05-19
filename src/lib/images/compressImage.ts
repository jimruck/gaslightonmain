const MAX_UPLOAD_BYTES = 10 * 1024 * 1024

/**
 * Resize and compress an image in the browser before uploading to Storage.
 * Output is WebP to reduce Supabase/Vercel bandwidth.
 */
export async function compressImageForUpload(
  file: File,
  maxWidth = 1600,
  quality = 0.82
): Promise<File> {
  if (!file.type.startsWith('image/')) {
    throw new Error('Please choose an image file (PNG, JPEG, or WebP).')
  }
  if (file.size > MAX_UPLOAD_BYTES) {
    throw new Error('Image must be 10 MB or smaller.')
  }

  const bitmap = await createImageBitmap(file)
  const scale = bitmap.width > maxWidth ? maxWidth / bitmap.width : 1
  const width = Math.max(1, Math.round(bitmap.width * scale))
  const height = Math.max(1, Math.round(bitmap.height * scale))

  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')
  if (!ctx) {
    bitmap.close()
    throw new Error('Could not process image.')
  }
  ctx.drawImage(bitmap, 0, 0, width, height)
  bitmap.close()

  const blob = await new Promise<Blob | null>((resolve) => {
    canvas.toBlob(resolve, 'image/webp', quality)
  })
  if (!blob) {
    throw new Error('Could not compress image.')
  }

  const baseName = file.name.replace(/\.[^.]+$/, '') || 'upload'
  return new File([blob], `${baseName}.webp`, { type: 'image/webp' })
}

export const STORAGE_UPLOAD_CACHE_CONTROL = '31536000, immutable'
