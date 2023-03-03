import {
  createBrowserRouter,
  type RouteObject,
} from "react-router-dom";
import { Dashboard, Error } from "~/components";

import { DocumentSection } from "./documents";
import { HomeSection } from "./home";

const routeConfig: RouteObject[] = [
  {
    path: "/",
    element: <Dashboard />,
    errorElement: <Error.Dashboard />,
    children: [
      {
        path: "/home",
        element: <HomeSection />,
        errorElement: <Error />,
      },
      {
        path: "/documents",
        element: <DocumentSection />,
        errorElement: <Error />,
      },
    ],
  },
] satisfies object[];

export const router = createBrowserRouter(routeConfig);

export type Pathnames = "/" | "/home" | "/documents"
