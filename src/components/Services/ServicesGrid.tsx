type ServiceItem = { title: string; description: string };

const POSITIONS = ["0%", "33.333%", "66.666%", "100%"] as const;

type ServicesGridProps = {
  items: ServiceItem[];
};

export function ServicesGrid({ items }: ServicesGridProps) {
  return (
    <div className="mt-10 grid w-full grid-cols-1 max-lg:bg-[url(/Services/sunset.webp)] max-lg:bg-cover max-lg:bg-left lg:grid-cols-4">
      {items.map((service, index) => (
        <details
          key={service.title}
          name="services"
          open={index === 0}
          className="service-card group relative flex flex-col justify-end overflow-hidden border-white/15 bg-[#041018]/50 transition-colors duration-300 motion-reduce:transition-none max-lg:border-t-2 lg:aspect-541/727 lg:border-l lg:border-white/20 lg:bg-transparent lg:first:border-l-0"
        >
          <div
            className="pointer-events-none absolute inset-0 hidden lg:block"
            style={{
              backgroundImage: "url(/Services/sunset.webp)",
              backgroundRepeat: "no-repeat",
              backgroundSize: "400% 100%",
              backgroundPosition: `${POSITIONS[index]} center`,
            }}
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-0 hidden bg-linear-to-t from-[#041018]/80 via-[#041018]/15 to-transparent lg:block"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-0 hidden bg-linear-to-t from-[#06283a] via-[#0b3a4c]/85 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100 motion-reduce:transition-none lg:block"
            aria-hidden="true"
          />

          <summary className="relative z-10 block w-full cursor-pointer list-none px-5 pt-5 text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2ad9c3] sm:px-6 sm:pt-6 lg:cursor-default lg:pointer-events-none [&::-webkit-details-marker]:hidden">
            <span className="block text-xs font-medium tracking-wide text-[#2ad9c3] lg:text-sm lg:text-white/80">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-2 text-xl font-semibold text-white">{service.title}</h3>
          </summary>
          <div className="service-panel relative z-10 grid px-5 pb-5 transition-[grid-template-rows] duration-300 motion-reduce:transition-none sm:px-6 sm:pb-6 lg:grid-rows-[0fr] lg:group-hover:grid-rows-[1fr] lg:group-focus-within:grid-rows-[1fr]">
            <div className="service-panel-inner overflow-hidden transition-[visibility] duration-300 motion-reduce:transition-none">
              <p className="pt-3 text-sm leading-relaxed text-white/85">{service.description}</p>
            </div>
          </div>
        </details>
      ))}
    </div>
  );
}
