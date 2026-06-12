import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSidebar } from "../context/SidebarContext";

// ─── Icons ───────────────────────────────────────────────────────────────────

const IconMenu = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

const IconSearch = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const IconBell = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);

const IconSettings = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

const IconMoon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

const IconSun = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
);

const IconLogout = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

const IconCheck = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const IconChevronDown = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const IconQuote = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" />
  </svg>
);

const IconApprove = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const IconWarning = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

const IconUser = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
  </svg>
);

// ─── Types ────────────────────────────────────────────────────────────────────

type Notification = {
  id: number;
  type: "quotation" | "approval" | "warning" | "info";
  title: string;
  message: string;
  time: string;
  read: boolean;
};

// ─── Mock notifications ───────────────────────────────────────────────────────

const INITIAL_NOTIFICATIONS: Notification[] = [
  { id: 1, type: "approval", title: "Quotation Approved", message: "QT-2024-0891 has been approved by Manager", time: "2 min ago", read: false },
  { id: 2, type: "quotation", title: "New Quotation Request", message: "Client Sharma Enterprises sent a new RFQ", time: "18 min ago", read: false },
  { id: 3, type: "warning", title: "Low Stock Alert", message: "Raw Material RM-047 below threshold (12 units)", time: "1 hr ago", read: false },
  { id: 4, type: "info", title: "Follow-up Due", message: "Quotation QT-2024-0876 follow-up pending today", time: "3 hr ago", read: true },
  { id: 5, type: "quotation", title: "Quotation Dispatched", message: "QT-2024-0888 dispatched to client via email", time: "Yesterday", read: true },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const getInitials = (name: string) =>
  name?.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2) || "AD";

const notifIcon = (type: Notification["type"]) => {
  const map = {
    quotation: { icon: <IconQuote />, bg: "rgba(56,131,255,0.15)", color: "#6eb0ff" },
    approval: { icon: <IconApprove />, bg: "rgba(78,202,139,0.15)", color: "#4eca8b" },
    warning: { icon: <IconWarning />, bg: "rgba(255,180,50,0.15)", color: "#ffb432" },
    info: { icon: <IconUser />, bg: "rgba(160,130,255,0.15)", color: "#a082ff" },
  };
  return map[type];
};

// ─── Component ────────────────────────────────────────────────────────────────

const AppHeader: React.FC = () => {
  const { isExpanded, isMobileOpen, toggleSidebar, toggleMobileSidebar } = useSidebar();
  const navigate = useNavigate();

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const handleMenuToggle = () => {
    if (isMobile) toggleMobileSidebar();
    else toggleSidebar();
  };

  const sidebarWidth = isExpanded || isMobileOpen ? 270 : 72;

  // User
  const [user, setUser] = useState<any>(null);
  useEffect(() => {
    const saved = localStorage.getItem("user");
    if (saved) setUser(JSON.parse(saved));
  }, []);

  // Dark mode
  const [darkMode, setDarkMode] = useState(true);

  // Search
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (searchOpen) searchRef.current?.focus();
  }, [searchOpen]);

  // Notifications
  const [notifications, setNotifications] = useState<Notification[]>(INITIAL_NOTIFICATIONS);
  const [notifOpen, setNotifOpen] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  const unread = notifications.filter((n) => !n.read).length;

  const markAllRead = () =>
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  const markRead = (id: number) =>
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );

  // Profile dropdown
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node))
        setNotifOpen(false);
      if (profileRef.current && !profileRef.current.contains(e.target as Node))
        setProfileOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Live clock
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const formatTime = (d: Date) =>
    d.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
  const formatDate = (d: Date) =>
    d.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" });

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("user");
      navigate("/signin");
    }
  };

  // ── Icon button helper ──────────────────────────────────────────────────────
  const IconBtn = ({
    onClick,
    title,
    children,
    active,
  }: {
    onClick: () => void;
    title: string;
    children: React.ReactNode;
    active?: boolean;
  }) => {
    const [hovered, setHovered] = useState(false);
    return (
      <button
        onClick={onClick}
        title={title}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          width: "36px",
          height: "36px",
          borderRadius: "10px",
          border: active
            ? "1px solid rgba(56,131,255,0.4)"
            : hovered
              ? "1px solid rgba(255,255,255,0.1)"
              : "1px solid transparent",
          background: active
            ? "rgba(56,131,255,0.15)"
            : hovered
              ? "rgba(255,255,255,0.06)"
              : "transparent",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          color: active ? "#6eb0ff" : "rgba(180,205,255,0.75)",
          transition: "all 0.15s",
          flexShrink: 0,
        }}
      >
        {children}
      </button>
    );
  };

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: `${sidebarWidth}px`,
        right: 0,
        height: "62px",
        zIndex: 40,
        transition: "left 0.25s ease",
        display: "flex",
        alignItems: "center",
        paddingInline: "18px",
        gap: "10px",
        background: "rgba(10,18,40,0.82)",
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
        borderBottom: "1px solid rgba(56,131,255,0.1)",
        boxShadow: "0 1px 0 rgba(56,131,255,0.06), 0 4px 24px rgba(0,0,0,0.3)",
      }}
    >
      {/* Top accent line */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "1px",
          background:
            "linear-gradient(90deg, transparent 0%, rgba(56,131,255,0.6) 30%, rgba(126,200,255,0.5) 60%, transparent 100%)",
          pointerEvents: "none",
        }}
      />

      {/* ── Hamburger ── */}
      <IconBtn onClick={handleMenuToggle} title="Toggle sidebar">
        <IconMenu />
      </IconBtn>

      {/* ── Breadcrumb / Page title ── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          marginRight: "auto",
        }}
      >
        <span style={{ fontSize: "13px", color: "rgba(130,170,255,0.5)", fontWeight: 500 }}>
          Portal
        </span>
        <span style={{ fontSize: "13px", color: "rgba(130,170,255,0.3)" }}>/</span>
        <span
          style={{
            fontSize: "14px",
            fontWeight: 700,
            background: "linear-gradient(90deg, #ffffff, #a8c8ff)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            letterSpacing: "0.2px",
          }}
        >
          Dashboard
        </span>
      </div>

      {/* ── Live Clock ── */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          marginRight: "4px",
        }}
      >
        <span
          style={{
            fontSize: "13px",
            fontWeight: 700,
            color: "#a8c8ff",
            letterSpacing: "0.5px",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {formatTime(time)}
        </span>
        <span style={{ fontSize: "10px", color: "rgba(130,170,255,0.5)", letterSpacing: "0.3px" }}>
          {formatDate(time)}
        </span>
      </div>

      {/* ── Divider ── */}
      <div style={{ width: "1px", height: "24px", background: "rgba(255,255,255,0.07)" }} />

      {/* ── Search ── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          background: searchOpen ? "rgba(56,131,255,0.08)" : "transparent",
          border: searchOpen
            ? "1px solid rgba(56,131,255,0.3)"
            : "1px solid transparent",
          borderRadius: "10px",
          padding: searchOpen ? "0 10px" : "0",
          transition: "all 0.2s ease",
          width: searchOpen ? "200px" : "36px",
          height: "36px",
          overflow: "hidden",
        }}
      >
        <button
          onClick={() => setSearchOpen((s) => !s)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "rgba(180,205,255,0.75)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 0,
            flexShrink: 0,
            width: "16px",
          }}
        >
          <IconSearch />
        </button>
        {searchOpen && (
          <input
            ref={searchRef}
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
            placeholder="Search..."
            onBlur={() => { if (!searchVal) setSearchOpen(false); }}
            style={{
              background: "none",
              border: "none",
              outline: "none",
              color: "#e0ecff",
              fontSize: "13px",
              flex: 1,
              caretColor: "#3883ff",
              minWidth: 0,
            }}
          />
        )}
      </div>

      {/* ── Dark mode toggle ── */}
      <IconBtn
        onClick={() => setDarkMode((d) => !d)}
        title={darkMode ? "Light mode" : "Dark mode"}
        active={false}
      >
        {darkMode ? <IconMoon /> : <IconSun />}
      </IconBtn>

      {/* ── Settings shortcut ── */}
      <IconBtn onClick={() => navigate("/forms/company-master")} title="Settings">
        <IconSettings />
      </IconBtn>

      {/* ── Notifications ── */}
      <div ref={notifRef} style={{ position: "relative" }}>
        <button
          onClick={() => { setNotifOpen((o) => !o); setProfileOpen(false); }}
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "10px",
            border: notifOpen
              ? "1px solid rgba(56,131,255,0.4)"
              : "1px solid transparent",
            background: notifOpen ? "rgba(56,131,255,0.15)" : "transparent",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            color: "rgba(180,205,255,0.75)",
            position: "relative",
            transition: "all 0.15s",
          }}
        >
          <IconBell />
          {unread > 0 && (
            <span
              style={{
                position: "absolute",
                top: "5px",
                right: "5px",
                width: "16px",
                height: "16px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #ff4f4f, #ff2020)",
                color: "white",
                fontSize: "9px",
                fontWeight: 800,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1.5px solid rgba(10,18,40,0.9)",
                lineHeight: 1,
                animation: "pulse-ring 1.8s ease infinite",
              }}
            >
              {unread}
            </span>
          )}
        </button>

        {/* Notification dropdown */}
        {notifOpen && (
          <div
            style={{
              position: "absolute",
              top: "calc(100% + 10px)",
              right: 0,
              width: "360px",
              background: "linear-gradient(180deg, #0f1c3a 0%, #112040 100%)",
              border: "1px solid rgba(56,131,255,0.15)",
              borderRadius: "14px",
              boxShadow: "0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(56,131,255,0.05)",
              overflow: "hidden",
              zIndex: 100,
            }}
          >
            {/* Header */}
            <div
              style={{
                padding: "14px 16px 12px",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                background: "rgba(56,131,255,0.05)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span
                  style={{
                    fontSize: "14px",
                    fontWeight: 700,
                    color: "#e0ecff",
                    letterSpacing: "0.2px",
                  }}
                >
                  Notifications
                </span>
                {unread > 0 && (
                  <span
                    style={{
                      background: "rgba(255,79,79,0.15)",
                      color: "#ff6b6b",
                      border: "1px solid rgba(255,79,79,0.25)",
                      fontSize: "10px",
                      fontWeight: 700,
                      padding: "1px 7px",
                      borderRadius: "20px",
                    }}
                  >
                    {unread} new
                  </span>
                )}
              </div>
              {unread > 0 && (
                <button
                  onClick={markAllRead}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "#6eb0ff",
                    fontSize: "12px",
                    fontWeight: 600,
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    padding: "3px 8px",
                    borderRadius: "6px",
                    transition: "background 0.15s",
                  }}
                >
                  <IconCheck /> Mark all read
                </button>
              )}
            </div>

            {/* List */}
            <div style={{ maxHeight: "340px", overflowY: "auto", scrollbarWidth: "none" }}>
              {notifications.map((n) => {
                const meta = notifIcon(n.type);
                return (
                  <div
                    key={n.id}
                    onClick={() => markRead(n.id)}
                    style={{
                      display: "flex",
                      gap: "12px",
                      padding: "12px 16px",
                      borderBottom: "1px solid rgba(255,255,255,0.04)",
                      cursor: "pointer",
                      background: n.read
                        ? "transparent"
                        : "rgba(56,131,255,0.04)",
                      transition: "background 0.15s",
                    }}
                    onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLDivElement).style.background =
                      "rgba(56,131,255,0.08)")
                    }
                    onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLDivElement).style.background = n.read
                      ? "transparent"
                      : "rgba(56,131,255,0.04)")
                    }
                  >
                    {/* Icon */}
                    <div
                      style={{
                        width: "34px",
                        height: "34px",
                        borderRadius: "9px",
                        background: meta.bg,
                        color: meta.color,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        marginTop: "1px",
                      }}
                    >
                      {meta.icon}
                    </div>
                    {/* Text */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div
                        style={{
                          fontSize: "13px",
                          fontWeight: n.read ? 500 : 700,
                          color: n.read ? "rgba(180,205,255,0.7)" : "#e0ecff",
                          marginBottom: "2px",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {n.title}
                      </div>
                      <div
                        style={{
                          fontSize: "12px",
                          color: "rgba(130,170,255,0.6)",
                          lineHeight: 1.45,
                          overflow: "hidden",
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                        }}
                      >
                        {n.message}
                      </div>
                      <div
                        style={{
                          fontSize: "10px",
                          color: "rgba(100,140,220,0.45)",
                          marginTop: "4px",
                          letterSpacing: "0.3px",
                        }}
                      >
                        {n.time}
                      </div>
                    </div>
                    {/* Unread dot */}
                    {!n.read && (
                      <div
                        style={{
                          width: "7px",
                          height: "7px",
                          borderRadius: "50%",
                          background: "#3883ff",
                          flexShrink: 0,
                          marginTop: "6px",
                          boxShadow: "0 0 6px rgba(56,131,255,0.6)",
                        }}
                      />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Footer */}
            <div
              style={{
                padding: "10px 16px",
                borderTop: "1px solid rgba(255,255,255,0.06)",
                textAlign: "center",
                background: "rgba(0,0,0,0.1)",
              }}
            >
              <button
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#6eb0ff",
                  fontSize: "12px",
                  fontWeight: 600,
                  letterSpacing: "0.2px",
                }}
              >
                View all notifications →
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ── Divider ── */}
      <div style={{ width: "1px", height: "24px", background: "rgba(255,255,255,0.07)" }} />

      {/* ── Profile ── */}
      <div ref={profileRef} style={{ position: "relative" }}>
        <button
          onClick={() => { setProfileOpen((o) => !o); setNotifOpen(false); }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            background: profileOpen ? "rgba(56,131,255,0.1)" : "transparent",
            border: profileOpen
              ? "1px solid rgba(56,131,255,0.3)"
              : "1px solid rgba(255,255,255,0.07)",
            borderRadius: "10px",
            padding: "4px 10px 4px 4px",
            cursor: "pointer",
            transition: "all 0.15s",
          }}
        >
          {/* Avatar */}
          <div
            style={{
              width: "28px",
              height: "28px",
              borderRadius: "8px",
              background: "linear-gradient(135deg, #3883ff, #1a57cc)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "11px",
              fontWeight: 800,
              color: "white",
              flexShrink: 0,
              boxShadow: "0 2px 8px rgba(56,131,255,0.35)",
            }}
          >
            {getInitials(user?.name || "Admin")}
          </div>
          <div style={{ textAlign: "left" }}>
            <div
              style={{
                fontSize: "12px",
                fontWeight: 700,
                color: "#e0ecff",
                lineHeight: 1.2,
                maxWidth: "90px",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {user?.name?.split(" ")[0] || "Admin"}
            </div>
            <div style={{ fontSize: "10px", color: "rgba(130,170,255,0.6)" }}>
              {user?.role_id === 1 ? "Administrator" : "User"}
            </div>
          </div>
          <span style={{ color: "rgba(130,170,255,0.5)", marginLeft: "2px" }}>
            <IconChevronDown />
          </span>
        </button>

        {/* Profile Dropdown */}
        {profileOpen && (
          <div
            style={{
              position: "absolute",
              top: "calc(100% + 10px)",
              right: 0,
              width: "220px",
              background: "linear-gradient(180deg, #0f1c3a 0%, #112040 100%)",
              border: "1px solid rgba(56,131,255,0.15)",
              borderRadius: "14px",
              boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
              overflow: "hidden",
              zIndex: 100,
            }}
          >
            {/* User Info */}
            <div
              style={{
                padding: "14px 16px",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
                background: "rgba(56,131,255,0.05)",
              }}
            >
              <div
                style={{
                  width: "42px",
                  height: "42px",
                  borderRadius: "12px",
                  background: "linear-gradient(135deg, #3883ff, #1a57cc)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "16px",
                  fontWeight: 800,
                  color: "white",
                  marginBottom: "10px",
                  boxShadow: "0 4px 14px rgba(56,131,255,0.4)",
                }}
              >
                {getInitials(user?.name || "Admin")}
              </div>
              <div
                style={{
                  fontSize: "14px",
                  fontWeight: 700,
                  color: "#e0ecff",
                  marginBottom: "2px",
                }}
              >
                {user?.name || "Admin User"}
              </div>
              <div style={{ fontSize: "12px", color: "rgba(130,170,255,0.6)" }}>
                {user?.email || "admin@company.com"}
              </div>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                  marginTop: "7px",
                  background: "rgba(78,202,139,0.12)",
                  border: "1px solid rgba(78,202,139,0.2)",
                  borderRadius: "5px",
                  padding: "2px 7px",
                }}
              >
                <div
                  style={{
                    width: "5px",
                    height: "5px",
                    borderRadius: "50%",
                    background: "#4eca8b",
                    boxShadow: "0 0 5px #4eca8b",
                  }}
                />
                <span
                  style={{
                    fontSize: "10px",
                    color: "#4eca8b",
                    fontWeight: 600,
                    letterSpacing: "0.4px",
                  }}
                >
                  {user?.role_id === 1 ? "ADMINISTRATOR" : "USER"}
                </span>
              </div>
            </div>

            {/* Menu Items */}
            {[
              { label: "My Profile", icon: <IconUser />, action: () => navigate("/profile") },
              { label: "Settings", icon: <IconSettings />, action: () => navigate("/forms/company-master") },
            ].map((item) => (
              <button
                key={item.label}
                onClick={() => { item.action(); setProfileOpen(false); }}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "10px 16px",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "rgba(180,205,255,0.8)",
                  fontSize: "13px",
                  fontWeight: 500,
                  textAlign: "left",
                  borderBottom: "1px solid rgba(255,255,255,0.04)",
                  transition: "background 0.15s, color 0.15s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = "rgba(56,131,255,0.08)";
                  (e.currentTarget as HTMLButtonElement).style.color = "#a8c8ff";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = "none";
                  (e.currentTarget as HTMLButtonElement).style.color = "rgba(180,205,255,0.8)";
                }}
              >
                <span style={{ color: "#6eb0ff" }}>{item.icon}</span>
                {item.label}
              </button>
            ))}

            {/* Logout */}
            <button
              onClick={handleLogout}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "10px 16px",
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "rgba(255,120,120,0.8)",
                fontSize: "13px",
                fontWeight: 600,
                textAlign: "left",
                transition: "background 0.15s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,50,50,0.08)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "none";
              }}
            >
              <span style={{ color: "#ff8080" }}><IconLogout /></span>
              Sign Out
            </button>
          </div>
        )}
      </div>

      {/* ── Pulse animation keyframes ── */}
      <style>{`
        @keyframes pulse-ring {
          0%   { box-shadow: 0 0 0 0 rgba(255,50,50,0.45); }
          60%  { box-shadow: 0 0 0 5px rgba(255,50,50,0); }
          100% { box-shadow: 0 0 0 0 rgba(255,50,50,0); }
        }
      `}</style>
    </header>
  );
};

export default AppHeader;