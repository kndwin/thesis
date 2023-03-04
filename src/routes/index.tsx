import { createBrowserRouter, type RouteObject } from "react-router-dom";
import { Dashboard, Error } from "~/components";

import { DocumentSection } from "./documents";
import { EditorSection } from "./editor";
import { NotesSection } from "./notes";

const routeConfig: RouteObject[] = [
  {
    path: "/",
    element: <Dashboard />,
    errorElement: <Error.Dashboard />,
    children: [
      {
        path: "/notes",
        element: <NotesSection />,
        errorElement: <Error />,
      },
      {
        path: "/editor",
        element: <EditorSection />,
        errorElement: <Error />,
      },
      {
        index: true,
        element: <DocumentSection />,
        errorElement: <Error />,
      },
    ],
  },
];

export const router = createBrowserRouter(routeConfig);

export type Pathnames = "/" | "/notes" | "/documents" | "/editor";
