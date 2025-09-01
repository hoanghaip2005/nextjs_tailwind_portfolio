import { projects } from '@/data/projects';
import ProjectCard from '../components/ProjectCard';

export default function Projects() {
  return (
    <main className="min-h-screen w-full py-16 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-16">
        <div className="text-center mb-8 lg:mb-12">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4" style={{ color: 'var(--txt)' }}>
            Recent <strong style={{ color: 'var(--txt-secondary)' }}>Projects</strong>
          </h1>
          <p className="text-base lg:text-lg max-w-2xl mx-auto" style={{ color: 'var(--txt)' }}>
            Take a look at some of my recent work.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.id} {...project} />
          ))}
        </div>
      </div>
    </main>
  );
}