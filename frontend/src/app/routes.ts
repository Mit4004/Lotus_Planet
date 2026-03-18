import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { Shop } from "./pages/Shop";
import { CareTips } from "./pages/CareTips";
import { Admin } from "./pages/Admin";
import { NotFound } from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "shop", Component: Shop },
      { path: "care-tips", Component: CareTips },
      { path: "admin", Component: Admin },
      { path: "*", Component: NotFound },
    ],
  },
]);
