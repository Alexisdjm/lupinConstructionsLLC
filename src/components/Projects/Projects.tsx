import { getDictionary } from "@/src/i18n/getDictionary";
import projects from "./config/projects.json";
import type { Project } from "./config/project";
import { ProjectSlider } from "./ProjectSlider";

const PROJECTS = projects as Project[];

export async function Projects() {
  const { messages } = await getDictionary();
  const copy = messages.projects;
  const localized = PROJECTS.map((project) => {
    const item = copy.items[project.id as keyof typeof copy.items];
    return {
      ...project,
      category: item.category,
      title: item.title,
      description: item.description,
    };
  });
  return (
    <section id="portfolio" className="scroll-mt-24 overflow-hidden bg-white py-16 lg:py-20">
      <div className="page-shell">
        <div className="mx-auto max-w-3xl text-center">
          <p className="flex items-center justify-center gap-2 text-[11px] font-semibold tracking-[0.22em] text-[#149e90] uppercase">
            <span className="size-1.5 rounded-full bg-[#2ad9c3]" aria-hidden="true" />
            {copy.eyebrow}
          </p>
          <h2 className="mt-3 text-3xl leading-tight font-medium text-[#1c2430] sm:text-4xl">
            {copy.title}
          </h2>
          <p className="mt-4 text-base leading-6 text-[#5f6974]">
            {copy.subtitle}
          </p>
        </div>
      </div>

      <ProjectSlider
        projects={localized}
        labels={{ carousel: copy.carousel, show: copy.show, previous: copy.previous, next: copy.next }}
        slidesPerView={4}
        breakpoints={{ mobile: 1, tablet: 2 }}
      />
    </section>
  );
}
