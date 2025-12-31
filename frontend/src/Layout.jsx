import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const Layout = () => (
  <div className="flex flex-col min-h-screen bg-gray-900 text-white">
    {/* Navbar */}
    <Navbar />

    {/* Main content */}
    <main className="flex-grow">
      <Outlet />
    </main>

    {/* Footer */}
    <Footer />
  </div>
);

export default Layout;