import { Metadata } from 'next';
import { getAllProjects, getSiteSettingsData } from '@/lib/sanity/client';
import ProjectCard from '@/components/ProjectCard';

export const revalidate = false;
export const dynamic = 'force-static';

export async function generateMetadata(): Promise<Metadata> {
  const siteSettings = await getSiteSettingsData();
  const businessName = siteSettings.company.name;
  const title = `Projects | ${businessName}`;
  const description = `Browse our portfolio of completed carpentry and building projects across Melbourne.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      locale: 'en_AU',
      siteName: businessName,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default async function ProjectsPage() {
  const projects = await getAllProjects();

  return (
    <main>
      {/* Hero */}
      <section className="py-20 md:py-28 bg-jlc-black text-white text-center px-6">
        <h1 className="font-display text-4xl md:text-6xl mb-4 leading-tight">Our Projects</h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          A showcase of our completed carpentry and building work across Melbourne.
        </p>
      </section>

      {/* Grid */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6">
          {projects.length === 0 ? (
            <p className="text-center text-gray-500 text-lg py-20">No projects published yet. Check back soon.</p>
          ) : (
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" aria-label="Projects">
              {projects.map((project) => (
                <li key={project._id}>
                  <ProjectCard project={project} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </main>
  );
}
