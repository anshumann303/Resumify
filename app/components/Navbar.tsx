import { useState, useEffect } from "react";
import { Link } from "react-router";

const T = {
  nav: {
    position: "fixed" as const,
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    transition: "background 0.35s, box-shadow 0.35s, backdrop-filter 0.35s",
  } as React.CSSProperties,
  inner: {
    maxWidth: 1120,
    margin: "0 auto",
    padding: "0 2rem",
    height: 64,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "1.5rem",
  } as React.CSSProperties,
  logo: {
    fontFamily: "'Playfair Display', serif",
    fontStyle: "italic" as const,
    fontWeight: 700,
    fontSize: "1.35rem",
    color: "#ffffff",
    letterSpacing: "-0.02em",
    textDecoration: "none",
    flexShrink: 0,
  } as React.CSSProperties,
  links: {
    display: "flex",
    alignItems: "center",
    gap: "0.25rem",
    flex: 1,
    justifyContent: "center",
  } as React.CSSProperties,
  navLink: {
    fontFamily: "'DM Sans', sans-serif",
    fontWeight: 400,
    fontSize: "0.875rem",
    color: "rgba(255,255,255,0.6)",
    padding: "0.4rem 0.75rem",
    borderRadius: 6,
    transition: "color 0.2s, background 0.2s",
    textDecoration: "none",
  } as React.CSSProperties,
  right: {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    flexShrink: 0,
  } as React.CSSProperties,
  signIn: {
    fontFamily: "'DM Sans', sans-serif",
    fontWeight: 400,
    fontSize: "0.875rem",
    color: "rgba(255,255,255,0.65)",
    padding: "0.4rem 0.75rem",
    background: "transparent",
    border: "none",
    cursor: "pointer",
    textDecoration: "none",
    transition: "color 0.2s",
  } as React.CSSProperties,
  cta: {
    fontFamily: "'DM Sans', sans-serif",
    fontWeight: 500,
    fontSize: "0.82rem",
    letterSpacing: "0.04em",
    color: "#ffffff",
    background: "#c8553d",
    border: "none",
    borderRadius: 6,
    padding: "0.5rem 1.1rem",
    cursor: "pointer",
    textDecoration: "none",
    transition: "background 0.2s, transform 0.15s",
    display: "flex",
    alignItems: "center",
  } as React.CSSProperties,
};

const scrolledStyle: React.CSSProperties = {
  background: "rgba(14,14,18,0.88)",
  boxShadow: "0 1px 0 rgba(255,255,255,0.06)",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
};
const transparentStyle: React.CSSProperties = {
  background: "transparent",
  boxShadow: "none",
};

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav style={{ ...T.nav, ...(scrolled ? scrolledStyle : transparentStyle) }}>
      <div style={T.inner}>
        {/* Logo */}
        <Link to="/" style={T.logo}>
          Re<span style={{ color: "#c8553d" }}>sum</span>ify
        </Link>

        {/* Centre links */}
        <div style={T.links} className="max-md:hidden">
          {[
            { label: "Features", href: "#features" },
            { label: "How it works", href: "#how" },
            { label: "About", href: "#about" },
          ].map((l) => (
            <a key={l.href} href={l.href} style={T.navLink}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color = "#fff";
                (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.06)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.6)";
                (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
              }}
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* Right actions */}
        <div style={T.right}>
          <Link to="/auth" style={T.signIn}
            onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#fff")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.65)")}
          >
            Sign In
          </Link>
          <Link to="/upload" style={T.cta}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = "#b04432";
              (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = "#c8553d";
              (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
            }}
          >
            Start Free →
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
