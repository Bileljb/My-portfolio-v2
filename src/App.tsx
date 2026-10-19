import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Layout from "./components/layout/Layout.tsx";
import Home from "./pages/Home.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
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
]);

export default function App() {
  return <RouterProvider router={router} />;
}
