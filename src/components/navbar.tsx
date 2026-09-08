import { useState, useEffect, useRef } from "react";
import { getCart } from "../lib/cart";

const BASE    = import.meta.env.BASE_URL.replace(/\/$/, "");
const API_URL = import.meta.env.PUBLIC_API_URL ?? "http://localhost:3000";

const DEFAULT_NAV_LINKS = [
  { label: "Drops",       slug: "jjk-shadow-drop", disabled: false },
  { label: "Hoodies",     slug: "hoodies",          disabled: false },
  { label: "Gym",         slug: "gym",              disabled: false },
  { label: "Manga Corta", slug: "manga-corta",      disabled: false },
  { label: "Gorras",      slug: "gorras",           disabled: true  },
  { label: "Zapatos",     slug: "zapatos",          disabled: true  },
];

const WA_URL = "https://wa.me/5217773019146";

interface NavLinkProp { label: string; slug: string; enabled: boolean }

export default function Navbar({ solid = false, navLinks }: { solid?: boolean; navLinks?: NavLinkProp[] }) {
  const NAV_LINKS = navLinks
    ? navLinks.map(l => ({ label: l.label, slug: l.slug, disabled: !l.enabled }))
    : DEFAULT_NAV_LINKS
  const [scrolled,   setScrolled]   = useState(solid);
  const [cartCount,  setCartCount]  = useState(0);
  const [menuOpen,   setMenuOpen]   = useState(false);
  const [user,       setUser]       = useState<{ name: string; email: string } | null>(null);
  const [userOpen,   setUserOpen]   = useState(false);
  const [dropPos,    setDropPos]    = useState({ top: 0, right: 0 });
  const menuRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);
  const userBtnRef = useRef<HTMLButtonElement>(null);

  // scroll
  useEffect(() => {
    const onScroll = () => setScrolled(solid || window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [solid]);

  // cart
  useEffect(() => {
    const update = () => setCartCount(getCart().length);
    update();
    window.addEventListener("cartUpdated", update);
    return () => window.removeEventListener("cartUpdated", update);
  }, []);

  // session — solo mostrar si es customer, no admin
  useEffect(() => {
    fetch(`${API_URL}/api/auth/get-session`, { credentials: "include" })
      .then(r => r.ok ? r.json() : null)
      .then(d => {
        if (d?.user && d.user.role !== "admin")
          setUser({ name: d.user.name, email: d.user.email });
      })
      .catch(() => {});
  }, []);

  // close burger on outside click
  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false);
    };
    if (menuOpen) document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [menuOpen]);

  // close user dropdown on outside click
  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (userRef.current && !userRef.current.contains(e.target as Node)) setUserOpen(false);
    };
    if (userOpen) document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [userOpen]);

  // body scroll lock
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const ink   = "#0d0d0d";
  const white = "#ffffff";
  const bg        = scrolled ? "rgba(255,255,255,0.97)" : "transparent";
  const border    = scrolled ? "1px solid rgba(0,0,0,0.08)" : "1px solid rgba(255,255,255,0.12)";
  const textColor = scrolled ? ink : white;

  const logout = async () => {
    await fetch(`${API_URL}/api/auth/sign-out`, { method: "POST", credentials: "include" });
    setUser(null);
    setUserOpen(false);
  };

  // ── CART ICON (reutilizable) ───────────────────────────────
  const CartIcon = ({ size = 20 }: { size?: number }) => (
    <a
      href={`${BASE}/shopping-cart`}
      style={{
        position: "relative", display: "flex", alignItems: "center",
        justifyContent: "center", width: "40px", height: "40px",
        color: textColor, textDecoration: "none", transition: "color 0.3s", flexShrink: 0,
      }}
      aria-label={`Carrito (${cartCount} productos)`}
    >
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
        <line x1="3" y1="6" x2="21" y2="6"/>
        <path d="M16 10a4 4 0 01-8 0"/>
      </svg>
      {cartCount > 0 && (
        <span style={{
          position: "absolute", top: "4px", right: "4px",
          minWidth: "16px", height: "16px", borderRadius: "50%",
          background: scrolled ? ink : white, color: scrolled ? white : ink,
          fontSize: "9px", fontFamily: "'PT Mono', monospace", fontWeight: 700,
          display: "flex", alignItems: "center", justifyContent: "center", lineHeight: 1,
          transition: "background 0.3s, color 0.3s",
        }}>
          {cartCount > 99 ? "99+" : cartCount}
        </span>
      )}
    </a>
  );

  return (
    <>
      {/* ── NAVBAR ── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        height: "64px", display: "flex", alignItems: "center",
        background: bg, backdropFilter: scrolled ? "blur(18px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(18px)" : "none",
        borderBottom: border,
        transition: "background 0.3s ease, border-color 0.3s ease",
      }}>
        <div style={{
          width: "100%", maxWidth: "1400px", margin: "0 auto",
          padding: "0 1.25rem", display: "flex", alignItems: "center", gap: "0.75rem",
        }}>

          {/* LOGO */}
          <a href={`${BASE}/`} style={{
            fontFamily: "'Noto Sans', sans-serif", fontWeight: 800, fontSize: "1rem",
            letterSpacing: "-0.04em", color: textColor, textDecoration: "none",
            transition: "color 0.3s", whiteSpace: "nowrap", flexShrink: 0,
          }}>
            RETRO REEVES
          </a>

          <div style={{ flex: 1 }} />

          {/* DESKTOP NAV LINKS */}
          <ul className="rr-nav-links" style={{
            display: "flex", alignItems: "center", gap: "0.1rem",
            listStyle: "none", margin: 0, padding: 0, flexShrink: 0,
          }}>
            {NAV_LINKS.map(link => (
              <li key={`${BASE}/coleccion/${link.slug}`}>
                {link.disabled ? (
                  <span title="Próximamente" style={{
                    fontFamily: "'PT Mono', monospace", fontSize: "0.62rem",
                    letterSpacing: "0.12em", textTransform: "uppercase" as const,
                    color: textColor, padding: "0.35rem 0.75rem", display: "block",
                    whiteSpace: "nowrap" as const, opacity: 0.35, cursor: "default",
                    userSelect: "none" as const,
                  }}>
                    {link.label}
                  </span>
                ) : (
                  <a href={`${BASE}/coleccion/${link.slug}`} style={{
                    fontFamily: "'PT Mono', monospace", fontSize: "0.62rem",
                    letterSpacing: "0.12em", textTransform: "uppercase" as const,
                    color: textColor, textDecoration: "none",
                    padding: "0.35rem 0.75rem", display: "block",
                    transition: "color 0.3s, opacity 0.2s", whiteSpace: "nowrap" as const, opacity: 0.85,
                  }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = "1")}
                  onMouseLeave={e => (e.currentTarget.style.opacity = "0.85")}
                  >
                    {link.label}
                  </a>
                )}
              </li>
            ))}
          </ul>

          <div style={{ flex: 1 }} />

          {/* ── DESKTOP RIGHT ACTIONS ── */}
          <div className="rr-desktop-actions" style={{ display: "flex", alignItems: "center", gap: "0.4rem", flexShrink: 0 }}>

            {/* WA */}
            <a href={WA_URL} target="_blank" rel="noopener noreferrer" style={{
              display: "inline-flex", alignItems: "center", gap: "0.5rem",
              fontFamily: "'PT Mono', monospace", fontSize: "0.62rem",
              letterSpacing: "0.12em", textTransform: "uppercase" as const,
              textDecoration: "none", color: white,
              background: scrolled ? ink : "rgba(255,255,255,0.12)",
              border: `1px solid ${scrolled ? ink : "rgba(255,255,255,0.5)"}`,
              padding: "0.5rem 1rem", transition: "background 0.3s, border-color 0.3s", whiteSpace: "nowrap" as const,
            }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp
            </a>

            {/* RASTREAR */}
            <a href={`${BASE}/seguimiento`} style={{
              display: "inline-flex", alignItems: "center", gap: "0.4rem",
              fontFamily: "'PT Mono', monospace", fontSize: "0.58rem",
              letterSpacing: "0.12em", textTransform: "uppercase" as const,
              color: textColor, textDecoration: "none",
              padding: "0.4rem 0.75rem",
              border: `1px solid ${scrolled ? "rgba(0,0,0,0.15)" : "rgba(255,255,255,0.3)"}`,
              transition: "all 0.2s", flexShrink: 0, opacity: 0.9, whiteSpace: "nowrap" as const,
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = "1" }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = "0.9" }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" style={{ flexShrink: 0 }}>
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
              </svg>
              Rastrear
            </a>

            {/* BÚSQUEDA */}
            <button onClick={() => window.dispatchEvent(new Event("rr:search"))} aria-label="Buscar" style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              width: "36px", height: "36px", background: "none", border: "none",
              cursor: "pointer", color: textColor, transition: "color 0.3s, opacity 0.2s",
              flexShrink: 0, padding: 0, opacity: 0.85,
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = "1")}
            onMouseLeave={e => (e.currentTarget.style.opacity = "0.85")}
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
            </button>

            {/* USUARIO */}
            <div ref={userRef} style={{ position: "relative", flexShrink: 0 }}>
              <button
                ref={userBtnRef}
                onClick={() => {
                  if (!user) { window.location.href = `${BASE}/login`; return; }
                  if (userBtnRef.current) {
                    const r = userBtnRef.current.getBoundingClientRect();
                    setDropPos({ top: r.bottom + 8, right: window.innerWidth - r.right });
                  }
                  setUserOpen(o => !o);
                }}
                aria-label="Mi cuenta"
                title={user ? user.name : "Iniciar sesión"}
                style={{
                  display: "flex", alignItems: "center", justifyContent: "center",
                  width: "36px", height: "36px", background: "none", border: "none",
                  cursor: "pointer", color: textColor, transition: "color 0.3s, opacity 0.2s",
                  padding: 0, opacity: 0.85, position: "relative",
                }}
                onMouseEnter={e => (e.currentTarget.style.opacity = "1")}
                onMouseLeave={e => (e.currentTarget.style.opacity = "0.85")}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
                </svg>
                {user && (
                  <span style={{
                    position: "absolute", bottom: "2px", right: "1px",
                    width: "7px", height: "7px", borderRadius: "50%",
                    background: "#16a34a", border: "1.5px solid " + (scrolled ? "rgba(255,255,255,0.97)" : "transparent"),
                  }} />
                )}
              </button>

              {/* User dropdown — position:fixed para escapar overflow */}
              {userOpen && user && (
                <div style={{
                  position: "fixed", top: dropPos.top, right: dropPos.right,
                  background: "#fff", border: "1px solid rgba(0,0,0,0.1)",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.14)", minWidth: "210px", zIndex: 1100,
                }}>
                  <div style={{ padding: "0.9rem 1rem", borderBottom: "1px solid rgba(0,0,0,0.07)" }}>
                    <p style={{ margin: 0, fontFamily: "'Noto Sans',sans-serif", fontWeight: 700, fontSize: "0.85rem", color: ink }}>{user.name}</p>
                    <p style={{ margin: "0.1rem 0 0", fontFamily: "'PT Mono',monospace", fontSize: "0.68rem", color: "rgba(0,0,0,0.4)", letterSpacing: "0.04em" }}>{user.email}</p>
                  </div>
                  <div style={{ padding: "0.4rem 0" }}>
                    {[
                      { label: "Mi perfil",   href: `${BASE}/mi-cuenta` },
                      { label: "Mis pedidos", href: `${BASE}/mi-cuenta#pedidos` },
                    ].map(item => (
                      <a key={item.href} href={item.href} style={{
                        display: "block", padding: "0.6rem 1rem",
                        fontFamily: "'PT Mono',monospace", fontSize: "0.72rem",
                        letterSpacing: "0.08em", textTransform: "uppercase" as const,
                        color: "rgba(0,0,0,0.6)", textDecoration: "none",
                        transition: "background 0.15s, color 0.15s",
                      }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#f5f4ef"; (e.currentTarget as HTMLElement).style.color = ink }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = ""; (e.currentTarget as HTMLElement).style.color = "rgba(0,0,0,0.6)" }}
                      >
                        {item.label}
                      </a>
                    ))}
                    <button onClick={logout} style={{
                      display: "block", width: "100%", textAlign: "left" as const,
                      padding: "0.6rem 1rem", background: "none", border: "none",
                      fontFamily: "'PT Mono',monospace", fontSize: "0.72rem",
                      letterSpacing: "0.08em", textTransform: "uppercase" as const,
                      color: "#c8382a", cursor: "pointer", transition: "background 0.15s",
                      borderTop: "1px solid rgba(0,0,0,0.06)", marginTop: "0.3rem",
                    }}
                    onMouseEnter={e => (e.currentTarget.style.background = "#fee2e2")}
                    onMouseLeave={e => (e.currentTarget.style.background = "")}
                    >
                      Cerrar sesión
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* CARRITO desktop */}
            <CartIcon />
          </div>

          {/* ── MOBILE RIGHT (carrito siempre + hamburger) ── */}
          <div className="rr-mobile-actions" style={{ display: "none", alignItems: "center", gap: "0rem", flexShrink: 0 }}>
            <CartIcon />
            <button
              onClick={() => setMenuOpen(o => !o)}
              aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
              style={{
                background: "none", border: "none", cursor: "pointer",
                padding: "8px", color: textColor, transition: "color 0.3s", flexShrink: 0,
              }}
            >
              {menuOpen
                ? <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                : <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
              }
            </button>
          </div>
        </div>
      </nav>

      {/* ── MOBILE DRAWER ── */}
      <div
        ref={menuRef}
        style={{
          position: "fixed", top: 0, right: 0, bottom: 0,
          width: "min(320px, 85vw)", background: ink, zIndex: 1001,
          transform: menuOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.35s cubic-bezier(.22,.68,0,1.2)",
          display: "flex", flexDirection: "column" as const,
          paddingTop: "80px", paddingLeft: "2rem", paddingRight: "2rem",
          paddingBottom: "2rem", overflowY: "auto" as const,
        }}
        aria-hidden={!menuOpen}
      >
        <button onClick={() => setMenuOpen(false)} style={{
          position: "absolute", top: "1rem", right: "1.25rem",
          background: "none", border: "none", cursor: "pointer",
          color: "rgba(255,255,255,0.5)", padding: "8px",
        }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>

        {/* Usuario en drawer */}
        {user ? (
          <div style={{ marginBottom: "1.5rem", paddingBottom: "1.5rem", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
            <p style={{ margin: "0 0 0.15rem", fontFamily: "'Noto Sans',sans-serif", fontWeight: 700, fontSize: "0.95rem", color: white }}>{user.name}</p>
            <p style={{ margin: "0 0 0.75rem", fontFamily: "'PT Mono',monospace", fontSize: "0.68rem", color: "rgba(255,255,255,0.4)", letterSpacing: "0.05em" }}>{user.email}</p>
            <a href={`${BASE}/mi-cuenta`} onClick={() => setMenuOpen(false)} style={{ fontFamily: "'PT Mono',monospace", fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "rgba(255,255,255,0.5)", textDecoration: "none" }}>
              Mis pedidos →
            </a>
          </div>
        ) : (
          <div style={{ marginBottom: "1.5rem", display: "flex", gap: "0.6rem" }}>
            <a href={`${BASE}/login`} onClick={() => setMenuOpen(false)} style={{
              flex: 1, textAlign: "center" as const, padding: "0.65rem",
              fontFamily: "'PT Mono',monospace", fontSize: "0.6rem", letterSpacing: "0.1em", textTransform: "uppercase" as const,
              background: white, color: ink, textDecoration: "none", fontWeight: 700,
            }}>Iniciar sesión</a>
            <a href={`${BASE}/registro`} onClick={() => setMenuOpen(false)} style={{
              flex: 1, textAlign: "center" as const, padding: "0.65rem",
              fontFamily: "'PT Mono',monospace", fontSize: "0.6rem", letterSpacing: "0.1em", textTransform: "uppercase" as const,
              border: "1px solid rgba(255,255,255,0.3)", color: white, textDecoration: "none",
            }}>Crear cuenta</a>
          </div>
        )}

        {/* Nav links */}
        <nav style={{ display: "flex", flexDirection: "column" as const }}>
          {NAV_LINKS.map((link, i) => link.disabled ? (
            <span key={`${BASE}/coleccion/${link.slug}`} title="Próximamente" style={{
              fontFamily: "'Noto Sans',sans-serif", fontWeight: 700, fontSize: "1.3rem",
              letterSpacing: "-0.02em", color: white,
              padding: "0.7rem 0", borderBottom: "1px solid rgba(255,255,255,0.08)",
              display: "flex", justifyContent: "space-between", alignItems: "center",
              opacity: 0, animation: menuOpen ? `drawerIn 0.4s ${i * 0.04 + 0.05}s ease forwards` : "none",
              cursor: "default", userSelect: "none" as const,
            }}>
              <span style={{ opacity: 0.35 }}>{link.label}</span>
              <span style={{ fontSize: "0.55rem", letterSpacing: "0.12em", fontFamily: "'PT Mono',monospace", fontWeight: 400, color: "rgba(255,255,255,0.3)", textTransform: "uppercase" as const }}>Próximamente</span>
            </span>
          ) : (
            <a key={`${BASE}/coleccion/${link.slug}`} href={`${BASE}/coleccion/${link.slug}`} onClick={() => setMenuOpen(false)} style={{
              fontFamily: "'Noto Sans',sans-serif", fontWeight: 700, fontSize: "1.3rem",
              letterSpacing: "-0.02em", color: white, textDecoration: "none",
              padding: "0.7rem 0", borderBottom: "1px solid rgba(255,255,255,0.08)",
              display: "flex", justifyContent: "space-between", alignItems: "center",
              opacity: 0, animation: menuOpen ? `drawerIn 0.4s ${i * 0.04 + 0.05}s ease forwards` : "none",
            }}>
              {link.label}
              <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "1rem" }}>→</span>
            </a>
          ))}
        </nav>

        {/* Acciones secundarias */}
        <div style={{ marginTop: "1.25rem", display: "flex", flexDirection: "column" as const, gap: "0" }}>
          {[
            { label: "Rastrear pedido", href: `${BASE}/seguimiento`, icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg> },
          ].map(item => (
            <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)} style={{
              display: "flex", alignItems: "center", gap: "0.75rem",
              fontFamily: "'PT Mono',monospace", fontSize: "0.62rem", letterSpacing: "0.1em", textTransform: "uppercase" as const,
              color: "rgba(255,255,255,0.45)", textDecoration: "none",
              padding: "0.7rem 0", borderBottom: "1px solid rgba(255,255,255,0.06)",
            }}>
              {item.icon}{item.label}
            </a>
          ))}

          <button onClick={() => { setMenuOpen(false); window.dispatchEvent(new Event("rr:search")); }} style={{
            display: "flex", alignItems: "center", gap: "0.75rem",
            background: "none", border: "none", borderBottom: "1px solid rgba(255,255,255,0.06)",
            cursor: "pointer", fontFamily: "'PT Mono',monospace", fontSize: "0.62rem",
            letterSpacing: "0.1em", textTransform: "uppercase" as const,
            color: "rgba(255,255,255,0.45)", padding: "0.7rem 0", width: "100%", textAlign: "left" as const,
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            Buscar productos
          </button>

          {user && (
            <button onClick={() => { logout(); setMenuOpen(false); }} style={{
              display: "flex", alignItems: "center", gap: "0.75rem",
              background: "none", border: "none", cursor: "pointer",
              fontFamily: "'PT Mono',monospace", fontSize: "0.62rem",
              letterSpacing: "0.1em", textTransform: "uppercase" as const,
              color: "#f87171", padding: "0.7rem 0", width: "100%", textAlign: "left" as const,
              marginTop: "0.5rem",
            }}>
              Cerrar sesión
            </button>
          )}
        </div>

        <a href={WA_URL} target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)} style={{
          display: "flex", alignItems: "center", justifyContent: "center", gap: "0.6rem",
          marginTop: "2rem", background: white, color: ink,
          fontFamily: "'PT Mono',monospace", fontSize: "0.7rem",
          letterSpacing: "0.12em", textTransform: "uppercase" as const, textDecoration: "none", padding: "1rem",
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          Comprar por WhatsApp
        </a>
      </div>

      {/* Overlay */}
      {menuOpen && (
        <div onClick={() => setMenuOpen(false)} style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.55)",
          zIndex: 1000, backdropFilter: "blur(2px)",
        }} aria-hidden="true" />
      )}

      <style>{`
        @media (max-width: 860px) {
          .rr-nav-links       { display: none !important; }
          .rr-desktop-actions { display: none !important; }
          .rr-mobile-actions  { display: flex !important; }
        }
        @keyframes drawerIn {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}
