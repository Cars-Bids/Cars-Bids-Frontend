import { useLocation } from "react-router-dom";

interface SidebarLink {
  label: string;
  href: string;
}

const sidebarLinks: SidebarLink[] = [
  { label: "Profile", href: "/profile"},
  { label: "Seller dashboard", href: "/seller-dashboard"},
  { label: "Watchlist", href: "/watchlist"},
  { label: "Settings", href: "/settings"},
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <div className="flex-shrink-0 p-2 w-full lg:w-auto">
      <div className="bg-[#212121] rounded-xl p-3 lg:max-w-[200px]">
        <nav
          className="
            grid grid-cols-2 gap-2
            sm:grid-cols-4
            lg:flex lg:flex-col lg:space-y-2
          "
        >
          {sidebarLinks.map((link) => {
            const isActive = location.pathname === link.href;
            return (
              <a
                key={link.label}
                href={link.href}
                className={`
                  block text-center lg:text-start py-1 rounded-lg transition-colors
                  ${isActive ? "text-white bg-steria-dark-card" : "text-gray-300 hover:text-white hover:bg-steria-dark-card"}
                `}
              >
                <div className="flex items-center justify-center lg:justify-start gap-2">
                  <span>{link.label}</span>
                </div>
              </a>
            );
          })}
        </nav>
      </div>
    </div>
  );
}