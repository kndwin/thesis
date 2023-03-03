import { Outlet, Link, useLocation } from "react-router-dom";
import { atom, useAtom } from "jotai";
import {
  FileText,
  HomeIcon,
  SunIcon,
  MoonIcon,
  ChevronLeft,
  CoffeeIcon,
} from "lucide-react";

import { Text, Button, Box } from "~/components";
import { type Pathnames } from "~/routes";
import { ReactNode, useState } from "react";

type NavButtons = {
  label: string;
  icon: ReactNode;
  pathname: Pathnames;
}[];

type DashboardProps = {
  disableHeader: boolean;
};
export const Dashboard = () => {
  const [theme] = useTheme();

  return (
    <div className={`flex w-screen h-screen bg-sand-1 ${theme}`}>
      <NavSidebar />
      <Outlet />
    </div>
  );
};

const navButtons: NavButtons = [
  {
    label: "Home",
    icon: <HomeIcon className="text-sand-12 w-full h-full" />,
    pathname: "/home",
  },
  {
    label: "Documents",
    icon: <FileText className="text-sand-12 w-full h-full" />,
    pathname: "/documents",
  },
];

const NavSidebar = () => {
  const { pathname } = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  return (
    <aside
      className="border-r border-sand-4 transition-all"
      style={{ width: collapsed ? 100 : 240 }}
    >
      <div className="px-8 py-6 relative">
        <Text
          className={`text-2xl flex items-center ${
            collapsed && "justify-center"
          } gap-2`}
        >
          <CoffeeIcon />
          {!collapsed && "Thesis"}
        </Text>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-1/2 -translate-y-1/2 hover:bg-sand-5 rounded cursor-pointer"
        >
          <ChevronLeft
            style={{ rotate: collapsed ? "180deg" : "0deg" }}
            className="text-sand-8  transition-all"
          />
        </button>
      </div>
      <div className="px-6 py-2 flex flex-col gap-2">
        {navButtons.map((nav) => (
          <Button
            key={nav.label}
            className={`${pathname === nav.pathname ? "bg-sand-5" : ""}`}
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
          </Button>
        ))}
      </div>
    </aside>
  );
};

const Header = () => {
  const { pathname } = useLocation();
  const [theme, setTheme] = useTheme();

  const pathnameLabel = navButtons.find(
    (nav) => nav.pathname === pathname
  )?.label;

  return (
    <header className="px-8 h-20 flex items-center justify-between">
      <div>
        <Text className="capitalize font-bold text-xl">{pathnameLabel}</Text>
      </div>
      <div className="flex items-center gap-2">
        <Button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
          {theme === "light" && <MoonIcon />}
          {theme === "dark" && <SunIcon />}
        </Button>
      </div>
    </header>
  );
};

export const Section = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex-1 flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col px-8 pt-8">{children}</main>
    </div>
  );
};

type Theme = "dark" | "light";
const themeAtom = atom<Theme>("dark");
export const useTheme = () => {
  const [theme, setTheme] = useAtom(themeAtom);
  return [theme, setTheme];
};
