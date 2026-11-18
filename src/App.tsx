import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Layout from "./components/layout/Layout.tsx";
import type { Lang } from "./data/services.ts";
import Home from "./pages/Home.tsx";

/** The services page in one language (copy in src/data/services*.ts). */
function servicesRoute(path: string, lang: Lang) {
  return {
    path,
    lazy: () =>
      import("./pages/Services.tsx").then(({ default: Services }) => ({
        Component: () => <Services lang={lang} />,
      })),
  };
}

const router = createBrowserRouter(
  [
    {
      path: "/",
      Component: Layout,
      children: [
        { index: true, Component: Home },
        servicesRoute("services", "en"),
        servicesRoute("fr/services", "fr"),
        servicesRoute("ar/services", "ar"),
        {
          path: "projects/:slug",
          lazy: () => import("./pages/ProjectPage.tsx").then((m) => ({ Component: m.default })),
        },
        {
          path: "*",
          lazy: () => import("./pages/NotFound.tsx").then((m) => ({ Component: m.default })),
        },
      ],
    },
  ],
  // Deploy base path ("/" or "/<repo>/" on GitHub Pages), set via BASE_PATH at build time.
  { basename: import.meta.env.BASE_URL },
);

export default function App() {
  return <RouterProvider router={router} />;
}
