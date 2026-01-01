import { Sidebar, SidebarBody, SidebarLink, useSidebar } from "@/components/ui/sidebar";
import { IconUpload, IconUser, IconLogout, IconHome } from "@tabler/icons-react";
import { Outlet } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
/* ---------- Sidebar Pieces ---------- */

function SidebarHeader() {
  const { open } = useSidebar();

  return (
    <div className="flex items-center gap-3 h-10">
      <div className="h-8 w-8 rounded-full bg-yellow-400 text-black font-bold flex items-center justify-center shrink-0">M</div>
      {open && <span className="text-lg font-semibold whitespace-nowrap">My App</span>}
    </div>
  );
}

function LogoutButton() {
  const { open } = useSidebar();
  const { logout } = useAuth();

  return (
    <button onClick={logout} className="flex items-center gap-2 h-10 text-sm text-red-500 hover:bg-gray-800 rounded">
      <IconLogout size={22} className="shrink-0" />
      {open && <span>Logout</span>}
    </button>
  );
}

/* ---------- Layout ---------- */

export default function DashboardLayout() {
  return (
    <div className="h-screen w-full bg-gray-900 text-white flex flex-col md:flex-row overflow-hidden">
      {/* Sidebar */}
      <Sidebar>
        <SidebarBody className="bg-black text-white">
          <div className="flex flex-col justify-between h-full">
            {/* Top */}
            <div className="flex flex-col gap-3">
              <SidebarHeader />

              <SidebarLink
                link={{
                  label: "Uploads",
                  href: "/dashboard",
                  icon: <IconUpload className="text-white shrink-0" />,
                }}
                className="h-10 rounded hover:bg-gray-800 [&_span]:text-white"
              />
               <SidebarLink
                link={{
                  label: "Home",
                  href: "/",
                  icon: <IconHome className="text-white shrink-0" />,
                }}
                className="h-10 rounded hover:bg-gray-800 [&_span]:text-white"
              />

              <SidebarLink
                link={{
                  label: "Account",
                  href: "#",
                  icon: <IconUser className="text-white shrink-0" />,
                }}
                className="h-10 rounded hover:bg-gray-800 [&_span]:text-white"
              />
            </div>

            {/* Bottom */}
            <LogoutButton />
          </div>
        </SidebarBody>
      </Sidebar>

      {/* Placeholder main area (empty for now) */}
      <main
        className="
          flex-1
          overflow-y-auto
          bg-gray-900
          p-6
          pt-16 md:pt-6
        ">
        <Outlet />
      </main>
    </div>
  );
}
