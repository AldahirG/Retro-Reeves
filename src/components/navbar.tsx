import { useState, useEffect, useRef } from "react";
import { getCart } from "../lib/cart";

const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

const NAV_LINKS = [
  { label: "Drops",       href: `${BASE}/coleccion/jjk-shadow-drop` },
  { label: "Hoodies",     href: `${BASE}/coleccion/hoodies`          },
  { label: "Gym",         href: `${BASE}/coleccion/gym`              },
  { label: "Manga Corta", href: `${BASE}/coleccion/manga-corta`      },
  { label: "Gorras",      href: `${BASE}/coleccion/gorras`           },
  { label: "Zapatos",     href: `${BASE}/coleccion/zapatos`          },
];

const WA_URL = "https://wa.me/5217773019146";

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const update = () => setCartCount(getCart().length);
    update();
    window.addEventListener("cartUpdated", update);
    return () => window.removeEventListener("cartUpdated", update);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node))
        setMenuOpen(false);
    };
    if (menuOpen) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [menuOpen]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  // ── colores según estado ──────────────────────────────────
  const ink   = "#0d0d0d";
  const white = "#ffffff";

  // Transparente sobre hero: texto BLANCO con borde inferior sutil
  // Scrolled: fondo blanco sólido, texto negro
  const bg          = scrolled ? "rgba(255,255,255,0.96)" : "transparent";
  const borderBot   = scrolled ? "1px solid rgba(0,0,0,0.08)" : "1px solid rgba(255,255,255,0.15)";
  const textColor   = scrolled ? ink   : white;
  const logoColor   = scrolled ? ink   : white;

  // Botón WA: scrolled → fondo negro sólido | transparente → outline blanco
  const waBg        = scrolled ? ink   : "rgba(255,255,255,0.12)";
  const waBorder    = scrolled ? ink   : "rgba(255,255,255,0.5)";
  const waText      = white; // siempre blanco (sobre negro o translúcido)

  return (
    <>
      {/* ── NAVBAR ── */}
      <nav style={{
        position:       "fixed",
        top:            0,
        left:           0,
        right:          0,
        zIndex:         1000,
        height:         "64px",
        display:        "flex",
        alignItems:     "center",
        background:     bg,
        backdropFilter: scrolled ? "blur(18px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(18px)" : "none",
        borderBottom:   borderBot,
        transition:     "background 0.3s ease, border-color 0.3s ease, backdrop-filter 0.3s ease",
        overflowX:      "hidden" as const,
      }}>
        <div style={{
          width:      "100%",
          maxWidth:   "1400px",
          margin:     "0 auto",
          padding:    "0 1.25rem",
          display:    "flex",
          alignItems: "center",
          gap:        "1rem",
          overflow:   "hidden",
        }}>

          {/* LOGO */}
          <a href={`${BASE}/`} style={{
            fontFamily:    "'Noto Sans', sans-serif",
            fontWeight:    800,
            fontSize:      "1rem",
            letterSpacing: "-0.04em",
            color:         logoColor,
            textDecoration:"none",
            transition:    "color 0.3s",
            whiteSpace:    "nowrap",
            flexShrink:    0,
          }}>
            RETRO REEVES
          </a>

          {/* SPACER IZQUIERDO — empuja links al centro */}
          <div style={{ flex: 1 }} />

          {/* DESKTOP LINKS — centrados */}
          <ul style={{
            display:    "flex",
            alignItems: "center",
            gap:        "0.1rem",
            listStyle:  "none",
            margin:     0,
            padding:    0,
            flexShrink: 0,
          }} className="rr-nav-links">
            {NAV_LINKS.map(link => (
              <li key={link.href}>
                <a
                  href={link.href}
                  style={{
                    fontFamily:    "'PT Mono', monospace",
                    fontSize:      "0.62rem",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color:         textColor,
                    textDecoration:"none",
                    padding:       "0.35rem 0.75rem",
                    display:       "block",
                    transition:    "color 0.3s, opacity 0.2s",
                    whiteSpace:    "nowrap",
                    opacity:       0.85,
                  }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = "1")}
                  onMouseLeave={e => (e.currentTarget.style.opacity = "0.85")}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* SPACER DERECHO */}
          <div style={{ flex: 1 }} />

          {/* RIGHT ACTIONS */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexShrink: 0 }}>

            {/* BOTÓN WHATSAPP — siempre muestra texto */}
            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display:       "inline-flex",
                alignItems:    "center",
                gap:           "0.5rem",
                fontFamily:    "'PT Mono', monospace",
                fontSize:      "0.62rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                textDecoration:"none",
                color:         waText,
                background:    waBg,
                border:        `1px solid ${waBorder}`,
                padding:       "0.5rem 1rem",
                transition:    "background 0.3s, border-color 0.3s",
                whiteSpace:    "nowrap",
              }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp
            </a>


            {/* BOTÓN BÚSQUEDA */}
            <button
              onClick={() => window.dispatchEvent(new Event("rr:search"))}
              aria-label="Buscar productos"
              style={{
                display:        "flex",
                alignItems:     "center",
                justifyContent: "center",
                width:          "36px",
                height:         "36px",
                background:     "none",
                border:         "none",
                cursor:         "pointer",
                color:          textColor,
                transition:     "color 0.3s, opacity 0.2s",
                flexShrink:     0,
                padding:        0,
                opacity:        0.85,
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = "1")}
              onMouseLeave={e => (e.currentTarget.style.opacity = "0.85")}
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/>
                <line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
            </button>

            {/* CARRITO */}
            <a
              href={`${BASE}/shopping-cart`}
              style={{
                position:       "relative",
                display:        "flex",
                alignItems:     "center",
                justifyContent: "center",
                width:          "40px",
                height:         "40px",
                color:          textColor,
                textDecoration: "none",
                transition:     "color 0.3s",
                flexShrink:     0,
              }}
              aria-label={`Carrito (${cartCount} productos)`}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 01-8 0"/>
              </svg>
              {cartCount > 0 && (
                <span style={{
                  position:       "absolute",
                  top:            "4px",
                  right:          "4px",
                  minWidth:       "16px",
                  height:         "16px",
                  borderRadius:   "50%",
                  background:     scrolled ? ink : white,
                  color:          scrolled ? white : ink,
                  fontSize:       "9px",
                  fontFamily:     "'PT Mono', monospace",
                  fontWeight:     700,
                  display:        "flex",
                  alignItems:     "center",
                  justifyContent: "center",
                  lineHeight:     1,
                  transition:     "background 0.3s, color 0.3s",
                }}>
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </a>

            {/* HAMBURGER — solo mobile */}
            <button
              onClick={() => setMenuOpen(o => !o)}
              aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
              style={{
                display:    "none",
                background: "none",
                border:     "none",
                cursor:     "pointer",
                padding:    "8px",
                color:      textColor,
                transition: "color 0.3s",
                flexShrink: 0,
              }}
              className="rr-hamburger"
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
          position:      "fixed",
          top:           0,
          right:         0,
          bottom:        0,
          width:         "min(320px, 85vw)",
          background:    ink,
          zIndex:        1001,
          transform:     menuOpen ? "translateX(0)" : "translateX(100%)",
          transition:    "transform 0.35s cubic-bezier(.22,.68,0,1.2)",
          display:       "flex",
          flexDirection: "column",
          paddingTop:    "80px",
          paddingLeft:   "2rem",
          paddingRight:  "2rem",
          paddingBottom: "2rem",
          overflowY:     "auto",
        }}
        aria-hidden={!menuOpen}
      >
        <button
          onClick={() => setMenuOpen(false)}
          style={{ position: "absolute", top: "1rem", right: "1.25rem", background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.5)", padding: "8px" }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>

        <a href={`${BASE}/`} style={{ fontFamily: "'Noto Sans', sans-serif", fontWeight: 800, fontSize: "1rem", letterSpacing: "-0.04em", color: white, textDecoration: "none", marginBottom: "2.5rem", display: "block" }}>
          RETRO REEVES
        </a>

        <nav style={{ display: "flex", flexDirection: "column" }}>
          {NAV_LINKS.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily:     "'Noto Sans', sans-serif",
                fontWeight:     700,
                fontSize:       "1.4rem",
                letterSpacing:  "-0.02em",
                color:          white,
                textDecoration: "none",
                padding:        "0.75rem 0",
                borderBottom:   "1px solid rgba(255,255,255,0.08)",
                display:        "flex",
                justifyContent: "space-between",
                alignItems:     "center",
                opacity:        0,
                animation:      menuOpen ? `drawerIn 0.4s ${i * 0.05 + 0.1}s ease forwards` : "none",
              }}
            >
              {link.label}
              <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "1rem" }}>→</span>
            </a>
          ))}
        </nav>


        {/* BUSCAR — mobile drawer */}
        <button
          onClick={() => { setMenuOpen(false); window.dispatchEvent(new Event("rr:search")); }}
          style={{
            display:        "flex",
            alignItems:     "center",
            gap:            "0.75rem",
            background:     "none",
            border:         "none",
            cursor:         "pointer",
            fontFamily:     "'PT Mono', monospace",
            fontSize:       "0.65rem",
            letterSpacing:  "0.12em",
            textTransform:  "uppercase",
            color:          "rgba(255,255,255,0.5)",
            padding:        "0.75rem 0",
            borderBottom:   "1px solid rgba(255,255,255,0.08)",
            width:          "100%",
            textAlign:      "left",
            marginTop:      "0.5rem",
          }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/>
            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          Buscar productos
        </button>

        <a
          href={WA_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setMenuOpen(false)}
          style={{
            display:        "flex",
            alignItems:     "center",
            justifyContent: "center",
            gap:            "0.6rem",
            marginTop:      "2.5rem",
            background:     white,
            color:          ink,
            fontFamily:     "'PT Mono', monospace",
            fontSize:       "0.7rem",
            letterSpacing:  "0.12em",
            textTransform:  "uppercase",
            textDecoration: "none",
            padding:        "1rem",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          Comprar por WhatsApp
        </a>
      </div>

      {/* Overlay mobile */}
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.55)", zIndex: 1000, backdropFilter: "blur(2px)" }}
          aria-hidden="true"
        />
      )}

      {/* Sin spacer — el hero debe usar margin-top: -64px para quedar bajo el navbar transparente */}

      <style>{`
        @media (max-width: 860px) {
          .rr-nav-links { display: none !important; }
          .rr-hamburger { display: flex !important; }
        }
        @keyframes drawerIn {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}