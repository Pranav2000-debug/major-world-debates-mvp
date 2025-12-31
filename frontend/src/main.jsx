import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from "react-router-dom";
import "./index.css";

import Layout from "./Layout";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";

import { AuthProvider } from "./context/AuthContext";
import PublicOnlyRoutes from "./routes/PublicOnlyRoutes";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import DashboardLayout from "./components/Dashboard/DashboardLayout";
import Dashboard from "./pages/Dashboard";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* PUBLIC LAYOUT */}
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<AboutUs />} />

        <Route element={<PublicOnlyRoutes />}>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Route>
      </Route>

      {/* DASHBOARD (NO NAVBAR) */}
      <Route element={<ProtectedRoutes />}>
        <Route path="dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
        </Route>
      </Route>
    </>
  )
);

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
