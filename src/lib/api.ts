const DEFAULT_API_URL = "https://api.lupinconstructionsllc.com";

export const API_BASE_URL = (
  process.env.NEXT_PUBLIC_API_URL?.trim() || DEFAULT_API_URL
).replace(/\/+$/, "");
