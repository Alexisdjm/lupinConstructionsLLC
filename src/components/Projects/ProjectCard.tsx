import Image from "next/image";
import type { Project } from "./config/project";

type ProjectCardProps = {
  project: Project;
  sizes: string;
};

export function ProjectCard({ project, sizes }: ProjectCardProps) {
  return (
    <article className="relative aspect-square overflow-hidden bg-[#102433]">
      <Image
        src={project.image}
        alt={`${project.title} in ${project.location}`}
        fill
        quality={90}
        sizes={sizes}
        className="object-cover"
      />
      <div className="absolute inset-0 bg-linear-to-t from-[#041018]/85 via-[#041018]/20 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-5">
        <p className="text-[11px] font-semibold tracking-[0.16em] text-[#2ad9c3] uppercase">
          {project.category}
        </p>
        <h3 className="mt-1 text-lg leading-tight font-semibold text-white">{project.title}</h3>
        <p className="mt-2 flex items-center gap-2 text-sm text-white/85">
          <span className="size-1.5 rounded-full bg-[#2ad9c3]" aria-hidden="true" />
          {project.location}
        </p>
      </div>
    </article>
  );
}
