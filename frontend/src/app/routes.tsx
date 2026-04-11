import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { Shop } from "./pages/Shop";
import { CareTips } from "./pages/CareTips";
import { NotFound } from "./pages/NotFound";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";

import { Checkout } from "./pages/Checkout";
import { Payment } from "./pages/Payment";

// Admin Imports
import { AdminLayout } from "./components/admin/AdminLayout";
import { AdminDashboard } from "./pages/admin/AdminDashboard";
import { AdminProducts } from "./pages/admin/AdminProducts";
import { AdminProductForm } from "./pages/admin/AdminProductForm";
import { AdminCategories } from "./pages/admin/AdminCategories";
import { AdminSettings } from "./pages/admin/AdminSettings";
import { AdminOrders } from "./pages/admin/AdminOrders";
import { AdminProductProvider } from "./context/AdminProductContext";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "shop", Component: Shop },
      { path: "care-tips", Component: CareTips },
      { path: "login", Component: Login },
      { path: "register", Component: Register },
      { path: "checkout", Component: Checkout },
      { path: "payment/:id", Component: Payment },
    ],
  },
  {
    path: "/admin",
    element: (
      <AdminProductProvider>
        <AdminLayout />
      </AdminProductProvider>
    ),
    children: [
      { index: true, Component: AdminDashboard },
      { path: "dashboard", Component: AdminDashboard },
      { path: "products", Component: AdminProducts },
      { path: "products/new", Component: AdminProductForm },
      { path: "products/:id", Component: AdminProductForm },
      { path: "categories", Component: AdminCategories },
      { path: "orders", Component: AdminOrders },
      { path: "settings", Component: AdminSettings },
    ],
  },
  { path: "*", Component: NotFound },
]);
