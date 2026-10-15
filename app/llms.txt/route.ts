import { siteUrl } from "@/src/i18n/site";

function llmsTxt(origin: string) {
  return `# Lupin Construction LLC

> Bespoke pools, spas, and outdoor living designed for South Florida. The company serves Miami, Fort Lauderdale, and Palm Beach.

Lupin Construction LLC designs and builds custom pools, remodels existing pools, repairs pools, and sells parts. One team handles design, engineering, permits, and construction. The online pool builder is a visual preview and does not show an instant price. A proposal follows after the team reviews the project.

## Contact

- Studio: 3941 SW 89th Av Apt 3
- Phone: (305) 321-2186
- Hours: Monday–Friday 8:00 AM–6:00 PM. Saturday by appointment.
- Area: Miami, Fort Lauderdale, and Palm Beach

## Pages

- [Home](${origin}/en): Luxury pools in South Florida
- [Inicio](${origin}/es): Piscinas de lujo en el sur de la Florida
- [Design your pool](${origin}/en/create): Visual pool builder. Not an instant quote.
- [Diseña tu piscina](${origin}/es/create): Constructor visual. No da un precio al instante.
- [Request a consultation](${origin}/en/contact): Consultation form
- [Solicita una consulta](${origin}/es/contact): Formulario de consulta
- [Terms of Service](${origin}/en/terms): Terms of Service
- [Términos del servicio](${origin}/es/terms): Términos del servicio
- [Privacy Policy](${origin}/en/privacy): Privacy Policy
- [Política de privacidad](${origin}/es/privacy): Política de privacidad
- [Sitemap](${origin}/sitemap.xml): XML sitemap
`;
}

export function GET() {
  return new Response(llmsTxt(siteUrl), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
