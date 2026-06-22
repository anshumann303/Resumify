import { Link } from "react-router";
import { useAuth, SignInButton, UserButton } from "@clerk/react-router";

const Navbar = () => {
  const { isSignedIn } = useAuth();

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "1rem 2rem",
        background: "rgba(14,14,18,0.8)",
        backdropFilter: "blur(14px)",
        borderBottom: "0.5px solid rgba(255,255,255,0.06)",
      }}
    >
      {/* Logo */}
      <Link
        to="/"
        style={{
          fontFamily: "'Playfair Display', serif",
          fontWeight: 900,
          fontSize: "1.35rem",
          letterSpacing: "-0.02em",
          color: "#fff",
          textDecoration: "none",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
        }}
      >
        Resumify
        <span
          style={{
            fontSize: "0.6rem",
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 500,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "#c8553d",
            border: "0.5px solid rgba(200,85,61,0.45)",
            borderRadius: 999,
            padding: "0.15rem 0.5rem",
          }}
        >
          AI
        </span>
      </Link>

      {/* Right side */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>

        {/* Sign In button — only when logged out */}
        {!isSignedIn && (
          <SignInButton mode="modal">
            <button
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 400,
                fontSize: "0.85rem",
                color: "rgba(255,255,255,0.55)",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                padding: "0.5rem 0.75rem",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLButtonElement).style.color = "#fff")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLButtonElement).style.color =
                  "rgba(255,255,255,0.55)")
              }
            >
              Sign In
            </button>
          </SignInButton>
        )}

        {/* Analyze Resume button — always visible */}
        <Link
          to="/upload"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 500,
            fontSize: "0.82rem",
            letterSpacing: "0.04em",
            color: "#fff",
            background: "#c8553d",
            border: "none",
            borderRadius: 7,
            padding: "0.55rem 1.25rem",
            textDecoration: "none",
            transition: "background 0.2s",
          }}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLAnchorElement).style.background = "#b04432")
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLAnchorElement).style.background = "#c8553d")
          }
        >
          Analyze Resume
        </Link>

        {/* User avatar + dropdown — only when logged in */}
        {isSignedIn && (
          <UserButton
            appearance={{
              elements: {
                avatarBox: { width: 32, height: 32 },
              },
            }}
          />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
