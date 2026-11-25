import { defineConfig } from 'vite';

const DEFAULT_ORIGIN = 'https://anvarsha-fathima.vercel.app';

function resolveSiteOrigin() {
  const raw =
    process.env.SITE_URL ||
    process.env.VERCEL_PROJECT_PRODUCTION_URL ||
    process.env.VERCEL_BRANCH_URL ||
    process.env.VERCEL_URL ||
    '';

  const trimmed = raw.trim().replace(/\/+$/, '');
  if (!trimmed) return DEFAULT_ORIGIN;
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
}

export default defineConfig({
  plugins: [
    {
      name: 'resolve-og-origin',
      transformIndexHtml(html) {
        const origin = resolveSiteOrigin();
        return origin === DEFAULT_ORIGIN
          ? html
          : html.replaceAll(DEFAULT_ORIGIN, origin);
      },
    },
  ],
});
