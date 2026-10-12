import { PrimaryCTA } from "@/src/components/UXUI/PrimaryCTA";

const SERVICES = [
  {
    number: "01",
    title: "Pool Construction",
    description:
      "Design and build a new pool from the first sketch through permits, structure, and finish, made for South Florida living.",
    position: "0%",
  },
  {
    number: "02",
    title: "Pool Remodeling",
    description:
      "Transform your existing pool with updated finishes, modern tile work, resurfacing, and structural improvements tailored to your vision.",
    position: "33.333%",
  },
  {
    number: "03",
    title: "Pool Repair",
    description:
      "Repair surfaces, equipment, plumbing, and structure so your pool is safe, efficient, and ready to swim again.",
    position: "66.666%",
  },
  {
    number: "04",
    title: "Parts Sales",
    description:
      "Premium finishes, equipment, and replacement parts selected for durability and a precise fit with your pool.",
    position: "100%",
  },
] as const;

export function ServicesGrid() {
  return (
    <div className="mt-10 grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      {SERVICES.map((service) => (
        <article
          key={service.number}
          className="group relative flex aspect-[541/727] flex-col justify-end overflow-hidden border-white/20 sm:border-l sm:first:border-l-0"
          style={{
            backgroundImage: "url(/Services/sunset.webp)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "400% 100%",
            backgroundPosition: `${service.position} center`,
          }}
        >
          <div
            className="pointer-events-none absolute inset-0 bg-linear-to-t from-[#041018]/80 via-[#041018]/15 to-transparent"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-0 bg-linear-to-t from-[#06283a] via-[#0b3a4c]/85 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100 motion-reduce:transition-none"
            aria-hidden="true"
          />

          <div className="relative z-10 p-5 sm:p-6">
            <p className="text-sm font-medium tracking-wide text-white/80">
              {service.number}
            </p>
            <h3 className="mt-2 text-xl font-semibold text-white">
              {service.title}
            </h3>
            <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 group-hover:grid-rows-[1fr] group-focus-within:grid-rows-[1fr] motion-reduce:transition-none">
              <div className="overflow-hidden">
                <p className="pt-3 text-sm leading-relaxed text-white/85">
                  {service.description}
                </p>
                <PrimaryCTA hoverColor="#C4FCFA" href="/#quote" className="mt-4">
                  Learn More
                </PrimaryCTA>
              </div>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
