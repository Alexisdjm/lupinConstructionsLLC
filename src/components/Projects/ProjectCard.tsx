import Image from "next/image";
import type { Project } from "./config/project";

type ProjectCardProps = {
  project: Project;
  sizes: string;
};

export function ProjectCard({ project, sizes }: ProjectCardProps) {
  return (
    <article
      className="group relative aspect-square overflow-hidden bg-[#102433] outline-none focus-visible:outline-2 focus-visible:-outline-offset-3 focus-visible:outline-[#2ad9c3]"
      tabIndex={0}
    >
      <Image
        src={project.image}
        alt={`${project.title}, ${project.location}`}
        fill
        quality={90}
        sizes={sizes}
        className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03] group-focus:scale-[1.03] motion-reduce:transition-none"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-linear-to-t from-[#041018]/85 via-[#041018]/20 to-transparent"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-linear-to-t from-[#06283a] via-[#0b3a4c]/85 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus:opacity-100 motion-reduce:transition-none"
        aria-hidden="true"
      />
      <div className="absolute inset-x-0 bottom-0 z-10 p-5">
        <p className="text-[11px] font-semibold tracking-[0.16em] text-[#2ad9c3] uppercase">
          {project.category}
        </p>
        <h3 className="mt-1 text-lg leading-tight font-semibold text-white">{project.title}</h3>
        <p className="mt-2 flex items-center gap-2 text-sm text-white/85">
          <span className="size-1.5 rounded-full bg-[#2ad9c3]" aria-hidden="true" />
          {project.location}
        </p>
        <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 group-hover:grid-rows-[1fr] group-focus:grid-rows-[1fr] motion-reduce:transition-none">
          <div className="overflow-hidden">
            <p className="pt-3 text-sm leading-relaxed text-white/85">
              {project.description}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}
