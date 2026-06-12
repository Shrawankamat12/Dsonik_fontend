import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSidebar } from "../context/SidebarContext";

type NavItem = {
  name: string;
  icon: React.ReactNode;
  path?: string;
  subItems?: { name: string; path: string; badge?: string }[];
};

const Logo3D = () => (
  <svg viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg" width={48} height={48}>
    <defs>
      <linearGradient id="grad-top" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#5aa3ff" />
        <stop offset="100%" stopColor="#7ec8ff" />
      </linearGradient>
      <linearGradient id="grad-right" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#1a57cc" />
        <stop offset="100%" stopColor="#0d3a99" />
      </linearGradient>
      <linearGradient id="grad-front" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#2d7fff" />
        <stop offset="100%" stopColor="#1a57cc" />
      </linearGradient>
    </defs>
    <polygon points="26,6 46,16 46,36 26,46 6,36 6,16" fill="url(#grad-front)" opacity="0.92" />
    <polygon points="26,6 46,16 26,26 6,16" fill="url(#grad-top)" />
    <polygon points="46,16 46,36 26,46 26,26" fill="url(#grad-right)" />
    <rect x="17" y="21" width="16" height="2" rx="1" fill="rgba(255,255,255,0.32)" />
    <rect x="17" y="26" width="12" height="2" rx="1" fill="rgba(255,255,255,0.22)" />
    <rect x="17" y="31" width="14" height="2" rx="1" fill="rgba(255,255,255,0.18)" />
    <polyline
      points="19,27 23,32 33,20"
      stroke="rgba(255,255,255,0.6)"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

const IconDashboard = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />
  </svg>
);
const IconFile = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" />
  </svg>
);
const IconPackage = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <line x1="16.5" y1="9.4" x2="7.5" y2="4.21" />
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    <polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" />
  </svg>
);
const IconDatabase = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
  </svg>
);
const IconSettings = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);
const IconLogout = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);
const IconChevron = ({ open }: { open: boolean }) => (
  <svg
    width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
    style={{ transition: "transform 0.2s", transform: open ? "rotate(180deg)" : "rotate(0deg)", marginLeft: "auto", opacity: 0.5 }}
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const AppSidebar: React.FC = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const location = useLocation();
  const navigate = useNavigate();

  const isOpen = isExpanded || isMobileOpen || isHovered;

  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (!savedUser) {
      alert("Please login first");
      navigate("/signin");
      return;
    }
    const parsed = JSON.parse(savedUser);
    if (!parsed?.name) {
      alert("Invalid session. Please login again.");
      localStorage.removeItem("user");
      navigate("/signin");
      return;
    }
    setUser(parsed);
  }, [navigate]);

  const handleLogout = () => {
    const confirmed = window.confirm("Are you sure you want to logout?");
    if (confirmed) {
      localStorage.removeItem("user");
      navigate("/signin");
    }
  };

  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [apiMenuItems, setApiMenuItems] = useState<{ name: string; path: string }[]>([]);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/test-manish?value=1`)
      .then((res) => {
        if (res.data && res.data.length > 0) {
          const formatted = res.data.map((item: any) => ({
            name: item.name,
            path: item.path || "#",
          }));
          setApiMenuItems(formatted);
        }
      })
      .catch((err) => console.log("Axios Error:", err));
  }, [BASE_URL]);

  let navItems: NavItem[] = [];

  if (user?.role_id === 1) {
    navItems = [
      {
        icon: <IconDashboard />,
        name: "Dashboard",
        path: "/home",
      },
      {
        name: "Quotation Module",
        icon: <IconFile />,
        subItems: [
          { name: "New Quotation", path: "/forms/quotation-all" },
          { name: "Quotation Desk", path: "/forms/new-quotation" },
          { name: "Quotation Approval", path: "/forms/quotation-approval", badge: "3" },
          { name: "Dispatch & Follow-up", path: "/quotation-tracking" },
          { name: "Status Tracking", path: "/quotation-tracking-status" },
          { name: "Follow-Up & Reminders", path: "/quotation-Followup-Reminder" },
        ],
      },
      {
        name: "Inventory Mgmt.",
        icon: <IconPackage />,
        subItems: [
          { name: "Product Stock", path: "/product-stock" },
          { name: "Product Issue List", path: "/product-issue" },
          { name: "Raw Material Stock", path: "/rmStockmaster" },
          { name: "RM Issue Stock", path: "/rmIssue" },
          { name: "RM Issue Item Stock", path: "/rmIssueItem" },
        ],
      },
      {
        name: "Inventory Master",
        icon: <IconDatabase />,
        subItems: [
          { name: "Supplier Master", path: "/suppliers" },
          { name: "Raw Material Master", path: "/raw-material" },
          { name: "Customers", path: "/forms/customers" },
          { name: "Product Master", path: "/forms/products" },
          { name: "GST Master", path: "/forms/gst-master" },
          { name: "Location / Warehouse", path: "/warehouse-locations" },
          { name: "Reference Master", path: "/refference" },
        ],
      },
      {
        name: "Masters",
        icon: <IconSettings />,
        subItems: [
          { name: "Company Setting", path: "/forms/company-master" },
          { name: "Roles", path: "/forms/role-master" },
          { name: "State", path: "/forms/state-master" },
          { name: "District", path: "/forms/district-master" },
          { name: "Currency", path: "/forms/currency" },
          { name: "User Master", path: "/forms/users" },
          { name: "Menu Master", path: "/forms/menu-master" },
          { name: "Role Menu Master", path: "/forms/Role-menu-master" },
          { name: "Module Menu Master", path: "/forms/module-menu-master" },
        ],
      },
    ];
  } else {
    navItems = [
      {
        name: "Processes",
        icon: <IconFile />,
        subItems: apiMenuItems,
      },
    ];
  }

  const isActive = useCallback(
    (path: string) => location.pathname === path,
    [location.pathname]
  );

  const [openSubmenu, setOpenSubmenu] = useState<number | null>(null);
  const subMenuRefs = useRef<Record<number, HTMLDivElement | null>>({});

  const handleSubmenuToggle = (index: number) => {
    setOpenSubmenu((prev) => (prev === index ? null : index));
  };

  const getInitials = (name: string) =>
    name
      ?.split(" ")
      .map((w: string) => w[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) || "AD";

  return (
    <aside
      style={{
        width: isOpen ? "270px" : "72px",
        height: "100vh",
        background: "linear-gradient(180deg, #0f1c3a 0%, #1a2f5e 45%, #0d2244 100%)",
        display: "flex",
        flexDirection: "column",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 50,
        transition: "width 0.25s ease",
        overflow: "hidden",
        boxShadow: "4px 0 24px rgba(0,0,0,0.35)",
      }}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* LOGO */}
      <div
        style={{
          padding: "20px 14px",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
          display: "flex",
          alignItems: "center",
          gap: "12px",
          flexShrink: 0,
        }}
      >
        <div style={{ flexShrink: 0 }}>
          <Logo3D />
        </div>
        {isOpen && (
          <div style={{ overflow: "hidden" }}>
            <div
              style={{
                fontSize: "16px",
                fontWeight: 800,
                color: "#ffffff",
                lineHeight: 1.25,
                letterSpacing: "0.3px",
              }}
            >
              Quotation<br />Management
            </div>
            <div
              style={{
                fontSize: "11px",
                color: "rgba(130,170,255,0.6)",
                letterSpacing: "1.2px",
                textTransform: "uppercase",
                marginTop: "3px",
              }}
            >
              Admin Portal
            </div>
          </div>
        )}
      </div>

      {/* NAV */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          overflowX: "hidden",
          padding: "12px 10px",
          scrollbarWidth: "none",
        }}
      >
        {navItems.map((nav, index) => {
          const isSubmenuOpen = openSubmenu === index;
          const subHeight = isSubmenuOpen
            ? (subMenuRefs.current[index]?.scrollHeight ?? 0)
            : 0;

          return (
            <div key={nav.name} style={{ marginBottom: "2px" }}>
              {nav.subItems ? (
                <button
                  onClick={() => handleSubmenuToggle(index)}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "9px 10px",
                    borderRadius: "8px",
                    border: "none",
                    cursor: "pointer",
                    background: isSubmenuOpen
                      ? "rgba(56,131,255,0.14)"
                      : "transparent",
                    color: isSubmenuOpen
                      ? "#c5d8ff"
                      : "rgba(180,205,255,0.82)",
                    fontSize: "15px",
                    fontWeight: isSubmenuOpen ? 600 : 500,
                    textAlign: "left",
                    transition: "background 0.15s, color 0.15s",
                  }}
                >
                  <span
                    style={{
                      width: "30px",
                      height: "30px",
                      borderRadius: "7px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: isSubmenuOpen
                        ? "rgba(56,131,255,0.22)"
                        : "rgba(255,255,255,0.05)",
                      color: isSubmenuOpen ? "#6eb0ff" : "rgba(180,205,255,0.82)",
                      flexShrink: 0,
                    }}
                  >
                    {nav.icon}
                  </span>
                  {isOpen && (
                    <>
                      <span style={{ flex: 1 }}>{nav.name}</span>
                      <IconChevron open={isSubmenuOpen} />
                    </>
                  )}
                </button>
              ) : (
                <Link
                  to={nav.path!}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "9px 10px",
                    borderRadius: "8px",
                    textDecoration: "none",
                    background: isActive(nav.path!)
                      ? "linear-gradient(90deg, rgba(56,131,255,0.22) 0%, rgba(56,131,255,0.06) 100%)"
                      : "transparent",
                    color: isActive(nav.path!)
                      ? "#ffffff"
                      : "rgba(180,205,255,0.82)",
                    fontSize: "15px",
                    fontWeight: isActive(nav.path!) ? 600 : 500,
                    position: "relative",
                    transition: "background 0.15s",
                  }}
                >
                  {isActive(nav.path!) && (
                    <span
                      style={{
                        position: "absolute",
                        left: 0,
                        top: "50%",
                        transform: "translateY(-50%)",
                        width: "3px",
                        height: "18px",
                        background: "#3883ff",
                        borderRadius: "0 3px 3px 0",
                      }}
                    />
                  )}
                  <span
                    style={{
                      width: "30px",
                      height: "30px",
                      borderRadius: "7px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: isActive(nav.path!)
                        ? "rgba(56,131,255,0.22)"
                        : "rgba(255,255,255,0.05)",
                      color: isActive(nav.path!) ? "#6eb0ff" : "rgba(180,205,255,0.82)",
                      flexShrink: 0,
                    }}
                  >
                    {nav.icon}
                  </span>
                  {isOpen && <span>{nav.name}</span>}
                </Link>
              )}

              {/* Submenu */}
              {nav.subItems && (
                <div
                  ref={(el) => (subMenuRefs.current[index] = el)}
                  style={{
                    overflow: "hidden",
                    maxHeight: `${subHeight}px`,
                    transition: "max-height 0.25s ease",
                  }}
                >
                  <ul
                    style={{
                      listStyle: "none",
                      padding: isOpen ? "4px 0 4px 40px" : "4px 0 4px 6px",
                      margin: 0,
                    }}
                  >
                    {nav.subItems.map((sub) => (
                      <li key={sub.name}>
                        <Link
                          to={sub.path}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            padding: "6px 10px",
                            borderRadius: "6px",
                            textDecoration: "none",
                            fontSize: "14px",
                            color: isActive(sub.path)
                              ? "#a8c8ff"
                              : "rgba(170,200,255,0.7)",
                            fontWeight: isActive(sub.path) ? 600 : 500,
                            background: isActive(sub.path)
                              ? "rgba(56,131,255,0.1)"
                              : "transparent",
                            marginBottom: "1px",
                            transition: "color 0.15s, background 0.15s",
                          }}
                        >
                          <span
                            style={{
                              width: "5px",
                              height: "5px",
                              background: isActive(sub.path)
                                ? "#3883ff"
                                : "rgba(100,150,255,0.28)",
                              borderRadius: "50%",
                              flexShrink: 0,
                              display: isOpen ? "block" : "none",
                            }}
                          />
                          {isOpen && sub.name}
                          {isOpen && sub.badge && (
                            <span
                              style={{
                                marginLeft: "auto",
                                background: "rgba(30,180,100,0.18)",
                                color: "#4eca8b",
                                fontSize: "10px",
                                fontWeight: 600,
                                padding: "2px 6px",
                                borderRadius: "10px",
                              }}
                            >
                              {sub.badge}
                            </span>
                          )}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* DIVIDER */}
      <div style={{ height: "1px", background: "rgba(255,255,255,0.06)", margin: "0 12px" }} />

      {/* USER + LOGOUT */}
      <div
        style={{
          padding: "12px 14px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          background: "rgba(0,0,0,0.15)",
          flexShrink: 0,
        }}
      >
        <div
          style={{
            width: "34px",
            height: "34px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #3883ff, #1a57cc)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "13px",
            fontWeight: 700,
            color: "white",
            flexShrink: 0,
          }}
        >
          {getInitials(user?.name || "Admin")}
        </div>

        {isOpen && (
          <>
            <div style={{ flex: 1, minWidth: 0, overflow: "hidden" }}>
              <div
                style={{
                  fontSize: "15px",
                  fontWeight: 600,
                  color: "#e0ecff",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {user?.name || "Admin User"}
              </div>
              <div style={{ fontSize: "12px", color: "rgba(130,170,255,0.7)" }}>
                {user?.role_id === 1 ? "Administrator" : "User"}
              </div>
            </div>

            <button
              onClick={handleLogout}
              title="Logout"
              style={{
                width: "30px",
                height: "30px",
                borderRadius: "7px",
                border: "1px solid rgba(255,80,80,0.25)",
                background: "rgba(255,50,50,0.08)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                color: "rgba(255,120,120,0.75)",
                transition: "all 0.15s",
                flexShrink: 0,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,50,50,0.2)";
                (e.currentTarget as HTMLButtonElement).style.color = "#ff8080";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,50,50,0.08)";
                (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,120,120,0.75)";
              }}
            >
              <IconLogout />
            </button>
          </>
        )}
      </div>
    </aside>
  );
};

export default AppSidebar;