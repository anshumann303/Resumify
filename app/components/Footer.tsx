import { Link } from "react-router";

const Footer = () => {
  const year = new Date().getFullYear();

  const col: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
  };

  const linkStyle: React.CSSProperties = {
    fontFamily: "'DM Sans', sans-serif",
    fontWeight: 300,
    fontSize: "0.85rem",
    color: "rgba(255,255,255,0.45)",
    textDecoration: "none",
    transition: "color 0.2s",
  };

  const hoverLink = (e: React.MouseEvent<HTMLAnchorElement>, enter: boolean) => {
    (e.currentTarget as HTMLAnchorElement).style.color = enter
      ? "rgba(255,255,255,0.85)"
      : "rgba(255,255,255,0.45)";
  };

  return (
    <footer
      style={{
        background: "#0e0e12",
        borderTop: "0.5px solid rgba(255,255,255,0.06)",
      }}
    >
      <div
        style={{
          maxWidth: 1120,
          margin: "0 auto",
          padding: "4rem 2rem 2rem",
        }}
      >
        {/* Top grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr 1fr",
            gap: "3rem",
            marginBottom: "3.5rem",
          }}
          className="max-md:grid-cols-2 max-sm:grid-cols-1"
        >
          {/* Brand */}
          <div style={col}>
            <Link
              to="/"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontStyle: "italic",
                fontWeight: 700,
                fontSize: "1.4rem",
                color: "#fff",
                letterSpacing: "-0.02em",
                marginBottom: "0.25rem",
              }}
            >
              Re<span style={{ color: "#c8553d" }}>sum</span>ify
            </Link>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 300,
                fontSize: "0.855rem",
                color: "rgba(255,255,255,0.4)",
                lineHeight: 1.7,
                maxWidth: 280,
              }}
            >
              AI-powered resume intelligence that helps you land your dream role — faster, smarter, with confidence.
            </p>
            {/* Social */}
            <div style={{ display: "flex", gap: "1rem", marginTop: "0.5rem" }}>
              {[
                {
                  label: "GitHub",
                  href: "https://github.com",
                  path: "M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z",
                },
                {
                  label: "LinkedIn",
                  href: "https://linkedin.com",
                  path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
                },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  style={{
                    color: "rgba(255,255,255,0.35)",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#fff")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.35)")}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d={s.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Product */}
          <div style={col}>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)" }}>
              Product
            </span>
            {[
              { label: "Home", to: "/" },
              { label: "Upload Resume", to: "/upload" },
              { label: "Features", href: "#features" },
              { label: "How it works", href: "#how" },
            ].map((l) =>
              l.to ? (
                <Link key={l.label} to={l.to} style={linkStyle}
                  onMouseEnter={(e) => hoverLink(e, true)}
                  onMouseLeave={(e) => hoverLink(e, false)}
                >{l.label}</Link>
              ) : (
                <a key={l.label} href={l.href} style={linkStyle}
                  onMouseEnter={(e) => hoverLink(e, true)}
                  onMouseLeave={(e) => hoverLink(e, false)}
                >{l.label}</a>
              )
            )}
          </div>

          {/* Company */}
          <div style={col}>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)" }}>
              Company
            </span>
            {["About", "Blog", "Careers", "Contact"].map((l) => (
              <a key={l} href="#" style={linkStyle}
                onMouseEnter={(e) => hoverLink(e, true)}
                onMouseLeave={(e) => hoverLink(e, false)}
              >{l}</a>
            ))}
          </div>

          {/* Legal */}
          <div style={col}>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 500, fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)" }}>
              Legal
            </span>
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((l) => (
              <a key={l} href="#" style={linkStyle}
                onMouseEnter={(e) => hoverLink(e, true)}
                onMouseLeave={(e) => hoverLink(e, false)}
              >{l}</a>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: "0.5px solid rgba(255,255,255,0.06)",
            paddingTop: "1.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "0.75rem",
          }}
        >
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: "0.78rem", color: "rgba(255,255,255,0.25)" }}>
            © {year} Resumify. All rights reserved.
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#22c55e",
                display: "inline-block",
                animation: "pulse-dot 2s ease-in-out infinite",
              }}
            />
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontSize: "0.78rem", color: "rgba(255,255,255,0.25)" }}>
              All systems operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;