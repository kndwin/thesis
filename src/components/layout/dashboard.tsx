import { Outlet, Link, useLocation } from "react-router-dom";
import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import {
  SunIcon,
  MoonIcon,
  ChevronLeft,
  FileEdit,
  PencilIcon,
  TypeIcon,
} from "lucide-react";

import { Text, Button, ScrollArea } from "~/components";
import { type Pathnames } from "~/routes";
import { HTMLAttributes, ReactNode, useState } from "react";
import { twMerge } from "tailwind-merge";
import { styled, VariantPropsOf } from "../variants";

type DashboardProps = {
  disableHeader: boolean;
};

export const Page = ({
  children,
  ...props
}: { children: ReactNode } & VariantPropsOf<typeof StyledPageContainer>) => {
  const [theme] = useTheme();
  return (
    <StyledPageContainer className={theme} {...props}>
      {children}
    </StyledPageContainer>
  );
};
const StyledPageContainer = styled("div", "w-screen h-screen bg-sand-1 flex", {
  variants: {
    variant: {
      dashboard: "flex-row",
      page: "flex-col",
    },
  },
});

export const Dashboard = () => {
  return (
    <Page variant="dashboard">
      <Sidebar />
      <Outlet />
    </Page>
  );
};

type Navigation = {
  label: string;
  icon?: ReactNode;
  pathname: Pathnames;
  status?: "active" | "beta";
  hidden?: boolean;
}[];

const nav: Navigation = [
  {
    label: "Documents",
    icon: <FileEdit className="text-sand-12 w-full h-full" />,
    pathname: "/",
  },
  {
    label: "Notes",
    icon: <PencilIcon className="text-sand-12 w-full h-full" />,
    pathname: "/notes",
    status: "beta",
  },
  {
    label: "Editor",
    icon: <TypeIcon className="text-sand-12 w-full h-full" />,
    pathname: "/editor",
    status: "beta",
  },
];

const Sidebar = () => {
  const { pathname } = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  return (
    <aside
      className="border-r-2 border-sand-4 transition-all"
      style={{ width: collapsed ? 100 : 240 }}
    >
      <div className="px-8 py-6 relative">
        <Text
          className={`text-2xl font-semibold flex items-center ${
            collapsed && "justify-center"
          } gap-2`}
        >
          <p className="font-serif">t</p>
        </Text>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-1/2 -translate-y-1/2 hover:bg-sand-5 bg-sand-1 border-2 border-sand-5 rounded-full cursor-pointer"
        >
          <ChevronLeft
            style={{ rotate: collapsed ? "180deg" : "0deg" }}
            className="text-sand-8 transition-all"
          />
        </button>
      </div>
      <div className="px-6 py-2 flex flex-col gap-2">
        {nav.map((nav) => (
          <>
            {!Boolean(nav.hidden) && (
              <Button
                key={nav.label}
                className={`${
                  pathname === nav.pathname ? "bg-orange-3" : ""
                } w-full`}
                variant="text"
                as={Link}
                to={nav.pathname}
              >
                <div
                  className={`w-4 h-4 flex justify-center ${
                    collapsed ? "items-center w-full" : "items-start"
                  }`}
                >
                  {nav.icon}
                </div>
                {!collapsed && nav.label}
                {!collapsed && nav.status === "beta" && (
                  <p className="text-xs px-1 rounded bg-orange-4 uppercase">
                    beta
                  </p>
                )}
              </Button>
            )}
          </>
        ))}
      </div>
    </aside>
  );
};

export const StyledHeader = styled(
  "header",
  "px-8 h-20 min-h-[5rem] flex items-center justify-between"
);

type Test = typeof StyledHeader;

const Header = () => {
  const { pathname } = useLocation();

  const pathnameLabel = nav.find((nav) => nav.pathname === pathname)?.label;

  return (
    <StyledHeader>
      <div>
        <Text size="2xl" className="capitalize">
          {pathnameLabel}
        </Text>
      </div>
      <div className="flex items-center gap-2">
        <ButtonToggleTheme />
      </div>
    </StyledHeader>
  );
};

export const ButtonToggleTheme = () => {
  const [theme, setTheme] = useTheme();
  return (
    <Button
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      {theme === "light" && <MoonIcon className="w-full h-full" />}
      {theme === "dark" && <SunIcon className="w-full h-full" />}
    </Button>
  );
};

export const Section = ({
  children,
  className,
  ...props
}: { children: ReactNode } & HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className="flex-1 flex flex-col">
      <Header />
      <ScrollArea
        {...props}
        dir="ltr"
        className={twMerge("flex h-full flex-col", className)}
      >
        {children}
      </ScrollArea>
    </div>
  );
};

type Theme = "dark" | "light";
const themeAtom = atomWithStorage<Theme>("theme", "light");
export const useTheme = () => {
  const [theme, setTheme] = useAtom(themeAtom);
  return [theme, setTheme];
};
