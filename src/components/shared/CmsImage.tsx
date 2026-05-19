'use client'

import Image from 'next/image'

type CmsImageProps = {
  src: string
  alt: string
  className?: string
  sizes: string
  priority?: boolean
}

/** CMS photos from Supabase Storage — served via Next.js image optimization. */
export function CmsImage({ src, alt, className, sizes, priority }: CmsImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      className={className}
      sizes={sizes}
      priority={priority}
      loading={priority ? undefined : 'lazy'}
    />
  )
}
