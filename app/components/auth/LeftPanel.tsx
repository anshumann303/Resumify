export default function LeftPanel() {
  return (
    <div
      style={{
        background: "#0e0e12",
        padding: "2.5rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        position: "relative",
        overflow: "hidden",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {/* Orb top-right */}
      <div
        style={{
          position: "absolute",
          width: 380,
          height: 380,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(200,85,61,0.18), transparent 65%)",
          top: -100,
          right: -80,
          pointerEvents: "none",
          animation: "lpFloat1 14s ease-in-out infinite",
        }}
      />
      {/* Orb bottom-left */}
      <div
        style={{
          position: "absolute",
          width: 320,
          height: 320,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(184,151,58,0.14), transparent 65%)",
          bottom: -80,
          left: -60,
          pointerEvents: "none",
          animation: "lpFloat2 18s ease-in-out infinite",
        }}
      />

      {/* Logo */}
      <a
        href="/"
        style={{
          fontFamily: "'Playfair Display', serif",
          fontStyle: "italic",
          fontWeight: 700,
          fontSize: "1.45rem",
          color: "#ffffff",
          letterSpacing: "-0.02em",
          textDecoration: "none",
          position: "relative",
          zIndex: 1,
          animation: "lpFadeUp 0.6s cubic-bezier(0.22,1,0.36,1) 0.1s both",
        }}
      >
        Re<span style={{ color: "#c8553d" }}>sum</span>ify
      </a>

      {/* Middle content */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.6rem",
            fontWeight: 500,
            fontSize: "0.7rem",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#c8553d",
            marginBottom: "1.1rem",
            animation: "lpFadeUp 0.6s cubic-bezier(0.22,1,0.36,1) 0.25s both",
          }}
        >
          <span
            style={{ display: "block", width: 24, height: 1, background: "#c8553d" }}
          />
          AI Resume Intelligence
        </div>

        <h2
          style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 900,
            fontSize: "clamp(1.8rem, 2.8vw, 2.4rem)",
            color: "#ffffff",
            lineHeight: 1.15,
            letterSpacing: "-0.02em",
            marginBottom: "1rem",
            animation: "lpFadeUp 0.6s cubic-bezier(0.22,1,0.36,1) 0.38s both",
          }}
        >
          Get hired
          <br />with{" "}
          <em style={{ fontStyle: "italic", color: "#c8553d" }}>confident</em>
          <br />
          clarity.
        </h2>

        <p
          style={{
            fontWeight: 300,
            fontSize: "0.9rem",
            color: "rgba(255,255,255,0.5)",
            lineHeight: 1.65,
            maxWidth: 300,
            marginBottom: "1.75rem",
            animation: "lpFadeUp 0.6s cubic-bezier(0.22,1,0.36,1) 0.5s both",
          }}
        >
          Your resume is your first impression. Make it the one that gets the
          callback — not the reject folder.
        </p>

        {/* Testimonial */}
        <div
          style={{
            border: "0.5px solid rgba(255,255,255,0.12)",
            borderRadius: 10,
            background: "rgba(255,255,255,0.03)",
            padding: "1.25rem 1.4rem",
            animation: "lpFadeUp 0.6s cubic-bezier(0.22,1,0.36,1) 0.62s both",
          }}
        >
          <p
            style={{
              fontFamily: "'Playfair Display', serif",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "0.88rem",
              color: "rgba(255,255,255,0.75)",
              lineHeight: 1.65,
              marginBottom: "1rem",
            }}
          >
            "Resumify flagged three ATS blockers I never knew about. One week
            later I had two interview requests from companies I'd been trying to
            crack for months."
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #c8553d, #b8973a)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.72rem",
                fontWeight: 500,
                color: "#ffffff",
                flexShrink: 0,
              }}
            >
              SR
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.15rem" }}>
              <span style={{ fontWeight: 500, fontSize: "0.78rem", color: "rgba(255,255,255,0.85)" }}>
                Sneha Rajan
              </span>
              <span style={{ fontWeight: 300, fontSize: "0.72rem", color: "rgba(255,255,255,0.4)" }}>
                Product Manager · Hired at Stripe
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div
        style={{
          display: "flex",
          position: "relative",
          zIndex: 1,
          animation: "lpFadeUp 0.6s cubic-bezier(0.22,1,0.36,1) 0.75s both",
        }}
      >
        {[
          { num: "42", suffix: "k+", label: "Resumes analysed" },
          { num: "3.8", suffix: "×", label: "More callbacks" },
          { num: "97", suffix: "%", label: "ATS pass rate" },
        ].map((s, i) => (
          <div
            key={s.label}
            style={{
              flex: 1,
              borderRight: i < 2 ? "0.5px solid rgba(255,255,255,0.08)" : "none",
              paddingRight: i < 2 ? "1.25rem" : 0,
              marginRight: i < 2 ? "1.25rem" : 0,
            }}
          >
            <div
              style={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 700,
                fontSize: "1.6rem",
                color: "#ffffff",
                lineHeight: 1,
              }}
            >
              {s.num}
              <em style={{ fontStyle: "italic", color: "#c8553d", fontSize: "1.1rem" }}>
                {s.suffix}
              </em>
            </div>
            <div
              style={{
                fontWeight: 300,
                fontSize: "0.72rem",
                color: "rgba(255,255,255,0.38)",
                marginTop: "0.3rem",
              }}
            >
              {s.label}
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes lpFadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes lpFloat1 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-20px, 25px); }
        }
        @keyframes lpFloat2 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(18px, -22px); }
        }
      `}</style>
    </div>
  );
}
