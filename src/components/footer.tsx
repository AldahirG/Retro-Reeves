const BASE = import.meta.env.BASE_URL?.replace(/\/$/, '') ?? ''

const LINKS = {
  'Colecciones': [
    { label: 'Drops activos',  href: `${BASE}/coleccion/jjk-shadow-drop` },
    { label: 'Hoodies',        href: `${BASE}/coleccion/hoodies` },
    { label: 'Gym',            href: `${BASE}/coleccion/gym` },
    { label: 'Manga Corta',    href: `${BASE}/coleccion/manga-corta` },
    { label: 'Gorras',         href: `${BASE}/coleccion/gorras` },
    { label: 'Zapatos',        href: `${BASE}/coleccion/zapatos` },
  ],
  'Ayuda': [
    { label: 'Cómo comprar',        href: '#' },
    { label: 'Envíos y entregas',   href: '#' },
    { label: 'Cambios y devoluciones', href: '#' },
    { label: 'Preguntas frecuentes', href: '#' },
  ],
  'Nosotros': [
    { label: 'Nuestra historia',  href: '#' },
    { label: 'Contacto',          href: `https://wa.me/5217773019146` },
    { label: 'Instagram',         href: '#' },
    { label: 'TikTok',            href: '#' },
  ],
}

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer style={{
      background: '#0d0d0d',
      color: '#fff',
      fontFamily: '"Noto Sans", sans-serif',
    }}>
      {/* ── MAIN FOOTER ── */}
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '4rem 2rem 3rem',
        display: 'grid',
        gridTemplateColumns: '1fr repeat(3, auto)',
        gap: '3rem',
      }}
        className="rr-footer-grid"
      >
        {/* Brand */}
        <div>
          <a href={`${BASE}/`} style={{
            fontWeight: 800,
            fontSize: '1.1rem',
            letterSpacing: '-0.04em',
            color: '#fff',
            textDecoration: 'none',
            display: 'block',
            marginBottom: '1rem',
          }}>
            RETRO REEVES
          </a>
          <p style={{
            fontFamily: '"PT Mono", monospace',
            fontSize: '0.65rem',
            letterSpacing: '0.06em',
            lineHeight: 1.8,
            color: 'rgba(255,255,255,0.45)',
            maxWidth: '240px',
            marginBottom: '1.5rem',
          }}>
            Streetwear · Anime · Gym · Cultura.<br/>
            Drops limitados. Envíos a todo México.
          </p>
          <a
            href="https://wa.me/5217773019146"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontFamily: '"PT Mono", monospace',
              fontSize: '0.62rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#fff',
              border: '1px solid rgba(255,255,255,0.3)',
              padding: '0.6rem 1.1rem',
              textDecoration: 'none',
              transition: 'border-color 0.2s',
            }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Comprar por WhatsApp
          </a>
        </div>

        {/* Link columns */}
        {Object.entries(LINKS).map(([title, links]) => (
          <div key={title}>
            <h4 style={{
              fontFamily: '"PT Mono", monospace',
              fontSize: '0.58rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.38)',
              marginBottom: '1rem',
              fontWeight: 400,
            }}>
              {title}
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
              {links.map(link => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    style={{
                      fontFamily: '"PT Mono", monospace',
                      fontSize: '0.65rem',
                      letterSpacing: '0.04em',
                      color: 'rgba(255,255,255,0.6)',
                      textDecoration: 'none',
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* ── BOTTOM BAR ── */}
      <div style={{
        borderTop: '1px solid rgba(255,255,255,0.08)',
        padding: '1.25rem 2rem',
        maxWidth: '1400px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '0.75rem',
      }}>
        <span style={{
          fontFamily: '"PT Mono", monospace',
          fontSize: '0.58rem',
          letterSpacing: '0.06em',
          color: 'rgba(255,255,255,0.28)',
        }}>
          © {year} Retro Reeves. Todos los derechos reservados.
        </span>
        <span style={{
          fontFamily: '"PT Mono", monospace',
          fontSize: '0.58rem',
          letterSpacing: '0.06em',
          color: 'rgba(255,255,255,0.28)',
        }}>
          Hecho con amor en México 🇲🇽
        </span>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .rr-footer-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 2rem !important;
          }
        }
        @media (max-width: 480px) {
          .rr-footer-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  )
}