import { useLocation } from "react-router-dom";
import { Links } from "@/components/Main/Links";
import { useSelector } from "react-redux";
import type { RootState } from "@/app/store";

interface SidebarLink {
  label: string;
  href: string;
}

const sidebarLinks: SidebarLink[] = [
  { label: "Profile", href: "/profile" },
  { label: "Seller dashboard", href: "/seller-dashboard" },
  { label: "Watchlist", href: "/watchlist" },
  { label: "Settings", href: "/settings" },
];

// simple JWT payload parser
function parseJwtPayload(token: string | null | undefined) {
  if (!token) return null;
  try {
    const payload = token.split(".")[1];
    if (!payload) return null;
    const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    console.error("Failed parsing token payload", e);
    return null;
  }
}

export default function Sidebar() {
  const location = useLocation();

  // отримуємо токен — спочатку з redux (якщо є), fallback на localStorage
  const accessTokenFromRedux = useSelector((s: RootState) => (s as any).auth?.accessToken);
  const accessToken =
    accessTokenFromRedux ||
    localStorage.getItem("accessToken") ||
    localStorage.getItem("token") ||
    null;

  // парсимо payload і шукаємо id у кількох можливих ключах
  const jwtPayload = parseJwtPayload(accessToken);
  const rawId =
    jwtPayload?.nameid ??
    jwtPayload?.nameidentifier ??
    jwtPayload?.sub ??
    jwtPayload?.id ??
    jwtPayload?.userId ??
    jwtPayload?.UserId ??
    jwtPayload?.["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"] ??
    null;

  const userId = rawId ? Number(rawId) : undefined;

  return (
    <div className="flex-shrink-0 p-2 w-full lg:w-auto">
      <div className="bg-[#DEDEDE] dark:bg-[#212121] rounded-xl p-3 lg:max-w-[200px]">
        <nav
          className="
            grid grid-cols-2 gap-2
            sm:grid-cols-4
            lg:flex lg:flex-col lg:space-y-2
          "
        >
          {sidebarLinks.map((link) => {
            // якщо це пункт Profile — підставляємо id (якщо є)
            const href = link.label === "Profile" ? (userId ? `/profile/${userId}` : "/profile") : link.href;

            // визначаємо активність: порівнюємо шлях закінчення або точну співпадінку
            const pathname = location.pathname;
            const isActive =
              pathname === href ||
              pathname.endsWith(href) || // наприклад /en/profile/5 -> endsWith('/profile/5')
              // додаткова перевірка для /profile або /profile/{id}
              (link.label === "Profile" &&
                (pathname === "/profile" ||
                  (userId !== undefined && (pathname.endsWith(`/profile/${userId}`) || pathname.endsWith(`/profile/${userId}/`)))));

            return (
              <Links
                key={link.label}
                to={href}
                className={`
                  block text-center lg:text-start py-1 rounded-lg transition-colors
                  ${isActive ? "text-black dark:text-white bg-steria-dark-card" : "text-[#2E2A23] dark:text-gray-300 dark:hover:text-white hover:text-black hover:bg-steria-dark-card"}
                `}
              >
                <div className="flex items-center justify-center lg:justify-start gap-2">
                  <span>{link.label}</span>
                </div>
              </Links>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
