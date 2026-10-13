import { Footer } from "@/src/components/Footer";
import { Header } from "@/src/components/Header";
import { getDictionary } from "@/src/i18n/getDictionary";

export default async function NotFound() {
  const { messages } = await getDictionary();

  return (
    <>
      <div className="h-19 bg-[#061B2D]">
        <Header />
      </div>

      <main className="flex min-h-[65vh] flex-1 items-center justify-center bg-white px-6 py-24 text-center text-[#061B2D]">
        <div>
          <h1 className="mx-auto w-[min(88vw,62rem)]">
            <span className="sr-only">404</span>
            <svg
              viewBox="0 0 1000 360"
              role="img"
              aria-label="404"
              className="block h-auto w-full overflow-visible"
            >
              <defs>
                <mask id="not-found-number-mask">
                  <rect width="1000" height="360" fill="black" />
                  <text
                    x="500"
                    y="302"
                    textAnchor="middle"
                    fill="white"
                    fontFamily="var(--font-plus-jakarta), sans-serif"
                    fontSize="350"
                    fontWeight="600"
                    letterSpacing="-28"
                  >
                    404
                  </text>
                </mask>
              </defs>

              <g mask="url(#not-found-number-mask)">
                <g className="not-found-liquid">
                  <g className="not-found-wave">
                    <path
                      d="M-260 54 C-165 20 -90 82 5 50 C100 18 175 80 270 48 C365 16 440 78 535 46 C630 14 705 76 800 44 C895 12 970 74 1065 42 C1160 10 1235 72 1330 40 L1330 440 L-260 440 Z"
                      fill="#20cbb7"
                    />
                  </g>
                </g>
              </g>
            </svg>
          </h1>
          <p className="text-xl font-medium tracking-[0.28em] uppercase sm:text-2xl">
            {messages.notFound.title}
          </p>
        </div>
      </main>

      <Footer />
    </>
  );
}
