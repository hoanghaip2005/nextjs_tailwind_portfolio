import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { BiLinkExternal } from '@react-icons/all-files/bi/BiLinkExternal';
import { getProjectById } from '@/data/projects';

interface ProjectPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = await params;
  const project = getProjectById(id);

  if (!project) {
    notFound();
  }

  const { image, title, description, links, technologies } = project;

  return (
    <main className="min-h-screen w-full py-24">
      <div className="mx-auto max-w-4xl px-6">
        <div className="bg-background/50 border border-foreground/10 rounded-lg overflow-hidden">
          <div className="aspect-video overflow-hidden">
            <Image
              alt={title}
              src={image.src}
              width={800}
              height={450}
              className="w-full h-full object-cover"
              priority
            />
          </div>

          <div className="p-8 space-y-6">
            <h1 className="text-3xl sm:text-4xl font-bold text-purple-600">
              {title}
            </h1>
            
            <p className="text-lg text-foreground/80 leading-relaxed">
              {description}
            </p>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Technologies:</h3>
              <div className="flex flex-wrap gap-2">
                {technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-purple-600/20 text-purple-600 rounded-full text-sm font-medium border border-purple-600/30"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              {links.site && (
                <a
                  href={links.site}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200 font-medium"
                >
                  <BiLinkExternal className="mr-2" />
                  View Project
                </a>
              )}

              {links.repo && (
                <a
                  href={links.repo}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3 border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-600 hover:text-white transition-all duration-200 font-medium"
                >
                  <BiLinkExternal className="mr-2" />
                  View Code
                </a>
              )}
            </div>

            <div className="pt-4 border-t border-foreground/10">
              <Link
                href="/projects"
                className="inline-flex items-center text-purple-600 hover:underline"
              >
                ← Back to Projects
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}