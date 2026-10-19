/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** "true" shows TODO badges in a production build (for preview deploys). */
  readonly VITE_SHOW_TODOS?: string;
  /** Deployed site URL, no trailing slash. Set in .env. */
  readonly VITE_SITE_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
