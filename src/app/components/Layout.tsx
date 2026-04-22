import { Outlet, useLocation, useNavigate } from "react-router";
import { Home, Calendar, User, Search } from "lucide-react";

export function Layout() {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { path: "/", icon: Home, label: "Home" },
    { path: "/agenda", icon: Calendar, label: "Agenda" },
    { path: "/pet-profile", icon: User, label: "Profilo" },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      <Outlet />

      <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-lg z-50">
        <div className="max-w-md mx-auto px-6 py-3">
          <div className="flex justify-around items-center">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`flex flex-col items-center gap-1 px-4 py-2 rounded-2xl transition-all ${
                    isActive
                      ? "bg-[var(--pastel-orange)] text-white"
                      : "text-muted-foreground"
                  }`}
                >
                  <Icon size={24} strokeWidth={2.5} />
                  <span className="text-xs">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>
    </div>
  );
}
