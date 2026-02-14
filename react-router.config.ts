import { vercelPreset } from "@vercel/react-router/vite";
import type { Config } from "@react-router/dev/config";

export default {
  // Config options...
  // Server-side render by default, to enable SPA mode set this to `false`
  ssr: true,
  presets: [vercelPreset()],
  // Pre-render static pages at build time for better performance and SEO
  async prerender() {
    return [
      "/about",
      "/privacy-policy",
      "/disclaimer",
      "/terms-of-service",
      "/404",
    ];
  },
} satisfies Config;
