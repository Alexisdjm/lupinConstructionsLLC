import Link from "next/link";
import { SectionLink } from "./SectionLink";

type LegalSection = {
  title: string;
  paragraphs: readonly string[];
};

type LegalCopy = {
  breadcrumbLabel: string;
  home: string;
  crumbGroup: string;
  crumbCurrent: string;
  title: string;
  intro: string;
  effective: string;
  sidebarTitle: string;
  tocTitle: string;
  summary: readonly string[];
  noteTitle: string;
  noteBody: string;
  sections: readonly LegalSection[];
};

function NoteIcon({ kind }: { kind: "info" | "shield" }) {
  if (kind === "shield") {
    return (
      <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
        <path
          d="M12 3.5 5.5 6.2v5.3c0 4.2 2.7 7.1 6.5 8.5 3.8-1.4 6.5-4.3 6.5-8.5V6.2L12 3.5Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path d="m8.8 12.1 2.1 2.1 4.3-4.4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
      <circle cx="12" cy="12" r="8.25" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="M12 11v5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="12" cy="8" r="0.8" fill="currentColor" />
    </svg>
  );
}

export function LegalPage({
  copy,
  homeHref,
  noteIcon = "info",
}: {
  copy: LegalCopy;
  homeHref: string;
  noteIcon?: "info" | "shield";
}) {
  const summary = copy.summary;

  return (
    <main>
      <section className="bg-[#061B2D] pt-28 pb-14 text-white sm:pt-32 sm:pb-16">
        <div className="page-shell max-w-3xl">
          <nav aria-label={copy.breadcrumbLabel}>
            <ol className="flex flex-wrap items-center gap-2 text-[11px] font-semibold tracking-[0.18em] uppercase">
              <li>
                <Link href={homeHref} className="text-white/45 transition-colors hover:text-white">
                  {copy.home}
                </Link>
              </li>
              <li className="text-white/25" aria-hidden="true">/</li>
              <li className="text-white/45">{copy.crumbGroup}</li>
              <li className="text-white/25" aria-hidden="true">/</li>
              <li className="text-white" aria-current="page">{copy.crumbCurrent}</li>
            </ol>
          </nav>
          <h1 className="mt-6 text-4xl leading-tight font-medium sm:text-5xl">{copy.title}</h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-white/70">{copy.intro}</p>
          <p className="mt-5 text-sm text-white/45">{copy.effective}</p>
        </div>
      </section>

      <section className="bg-[#f4f7f8] py-10 sm:py-14">
        <div className="page-shell grid items-start gap-6 lg:grid-cols-[300px_minmax(0,1fr)] lg:gap-8">
          <aside className="rounded-2xl bg-[#0c1c2e] p-5 text-white lg:sticky lg:top-24">
            {summary.length > 0 ? (
              <>
                <p className="text-[11px] font-semibold tracking-[0.18em] text-white/45 uppercase">{copy.sidebarTitle}</p>
                <ul className="mt-4 space-y-3">
                  {summary.map((item) => (
                    <li key={item} className="flex gap-2.5 text-sm leading-5 text-white/80">
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-[#2ad9c3]" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </>
            ) : null}
            <p className={`text-[11px] font-semibold tracking-[0.18em] text-white/45 uppercase ${summary.length > 0 ? "mt-6" : ""}`}>
              {summary.length > 0 ? copy.tocTitle : copy.sidebarTitle}
            </p>
            <ol className="mt-4 space-y-2.5">
              {copy.sections.map((section, index) => (
                <li key={section.title}>
                  <SectionLink
                    id={`section-${index + 1}`}
                    className="flex gap-2.5 text-sm leading-5 text-white/75 transition-colors hover:text-white"
                  >
                    <span className="w-5 shrink-0 text-xs font-semibold text-[#2ad9c3] tabular-nums">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {section.title}
                  </SectionLink>
                </li>
              ))}
            </ol>
          </aside>

          <article className="rounded-2xl border border-[#e6ecef] bg-white px-5 py-6 shadow-[0_16px_50px_rgba(6,27,45,0.05)] sm:px-8 sm:py-8 lg:px-10">
            <div className="flex gap-3 rounded-xl border border-[#2ad9c3]/30 bg-[#effcf9] px-4 py-4 text-[#0d3d36]">
              <span className="mt-0.5 text-[#149e90]">
                <NoteIcon kind={noteIcon} />
              </span>
              <div>
                <p className="text-sm font-semibold">{copy.noteTitle}</p>
                <p className="mt-1 text-sm leading-6 text-[#0d3d36]/80">{copy.noteBody}</p>
              </div>
            </div>

            <div className="mt-8 divide-y divide-[#e8eef1]">
              {copy.sections.map((section, index) => (
                <section key={section.title} id={`section-${index + 1}`} className="scroll-mt-28 py-7 first:pt-0 last:pb-0">
                  <h2 className="flex gap-3 text-lg font-semibold text-[#172330]">
                    <span className="text-sm font-semibold text-[#149e90] tabular-nums">{String(index + 1).padStart(2, "0")}</span>
                    {section.title}
                  </h2>
                  <div className="mt-3 space-y-3 pl-8">
                    {section.paragraphs.map((paragraph, paragraphIndex) => (
                      <p key={paragraphIndex} className="text-sm leading-7 text-[#5f6974]">{paragraph}</p>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
