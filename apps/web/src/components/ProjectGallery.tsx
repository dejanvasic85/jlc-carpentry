'use client';

import { useState } from 'react';
import ImageCarousel from '@/components/ImageCarousel';
import { RecentProject } from '@/lib/sanity/schemas';

interface ProjectGalleryProps {
  projects: RecentProject[];
  serviceTitle: string;
}

export default function ProjectGallery({ projects, serviceTitle }: ProjectGalleryProps) {
  const [selectedProject, setSelectedProject] = useState<RecentProject>(projects[0]);

  if (!projects || projects.length === 0) {
    return null;
  }

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl mb-4 text-jlc-black">Recent Projects</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our latest {serviceTitle.toLowerCase()} projects across Melbourne
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {/* Project Selector (if multiple projects) */}
          {projects.length > 1 && (
            <div className="mb-8">
              <div className="flex flex-wrap gap-3 justify-center">
                {projects.map((project) => (
                  <button
                    key={project._id}
                    onClick={() => setSelectedProject(project)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      selectedProject._id === project._id
                        ? 'bg-jlc-blue text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {project.suburb} - {project.date.month} {project.date.year}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Inline Carousel */}
          <ImageCarousel project={selectedProject} />

          {/* Project Count Info */}
          <div className="text-center mt-8">
            <p className="text-gray-500 text-sm">
              {projects.length} project{projects.length !== 1 ? 's' : ''} featured
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}