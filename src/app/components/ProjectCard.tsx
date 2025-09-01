'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Project } from '@/data/projects';

type ProjectCardProps = Project;

export default function ProjectCard({ id, image, title, description }: ProjectCardProps) {
  return (
    <div className="group bg-background/50 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-200"
         style={{ boxShadow: '0 4px 8px var(--card-shadow)' }}>
      <Link href={`/project/${id}`}>
        <div className="aspect-video overflow-hidden relative">
          <Image
            alt={title}
            src={image.src}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-200"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        
        <div className="p-4 sm:p-6 space-y-3">
          <h3 className="text-lg sm:text-xl font-semibold transition-colors duration-200" 
              style={{ color: 'var(--txt)' }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--txt-secondary)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--txt)'}
          >
            {title}
          </h3>
          <p className="text-sm sm:text-base line-clamp-3" style={{ color: 'var(--txt)' }}>
            {description}
          </p>
        </div>
      </Link>
    </div>
  );
}
