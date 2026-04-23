import type { Route } from "./+types/home";
import Navbar from "~/components/Navbar";
import Footer from "~/components/Footer";
import { Link } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Resumify — AI Resume Intelligence" },
    {
      name: "description",
      content:
        "Get hired with confident clarity. AI-powered resume analysis: ATS scores, skills matching, shortlisting probability.",
    },
  ];
}

/* ─── Orb component ─── */
function Orb({
  size,
  color,
  top,
  right,
  left,
  bottom,
  anim,
}: {
  size: number;
  color: string;
  top?: number | string;
  right?: number | string;
  left?: number | string;
  bottom?: number | string;
  anim: string;
}) {
  return (
    <div
      style={{
        position: "absolute",
        width: size,
        height: size,
        borderRadius: "50%",
        background: color,
        top,
        right,
        left,
        bottom,
        pointerEvents: "none",
        animation: anim,
      }}
    />
  );
}

/* ─── Feature Card ─── */
function FeatureCard({
  icon,
  title,
  body,
  delay,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
  delay: string;
}) {
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "0.5px solid rgba(255,255,255,0.08)",
        borderRadius: 14,
        padding: "2rem",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        animation: `fadeUp 0.6s cubic-bezier(0.22,1,0.36,1) ${delay} both`,
        transition: "background 0.25s, border-color 0.25s",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.background =
          "rgba(255,255,255,0.055)";
        (e.currentTarget as HTMLDivElement).style.borderColor =
          "rgba(255,255,255,0.14)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.background =
          "rgba(255,255,255,0.03)";
        (e.currentTarget as HTMLDivElement).style.borderColor =
          "rgba(255,255,255,0.08)";
      }}
    >
      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: 10,
          background: "rgba(200,85,61,0.14)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#c8553d",
          flexShrink: 0,
        }}
      >
        {icon}
      </div>
      <h3
        style={{
          fontFamily: "'Playfair Display', serif",
          fontWeight: 700,
          fontSize: "1.1rem",
          color: "#fff",
          margin: 0,
        }}
      >
        {title}
      </h3>
      <p
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 300,
          fontSize: "0.875rem",
          color: "rgba(255,255,255,0.5)",
          lineHeight: 1.7,
          margin: 0,
        }}
      >
        {body}
      </p>
    </div>
  );
}

/* ─── Step ─── */
function Step({
  num,
  title,
  body,
}: {
  num: string;
  title: string;
  body: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "0.75rem",
        position: "relative",
      }}
    >
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: 36,
          height: 36,
          borderRadius: "50%",
          background: "rgba(200,85,61,0.15)",
          border: "0.5px solid rgba(200,85,61,0.4)",
          fontFamily: "'Playfair Display', serif",
          fontWeight: 700,
          fontSize: "0.9rem",
          color: "#c8553d",
        }}
      >
        {num}
      </div>
      <h3
        style={{
          fontFamily: "'Playfair Display', serif",
          fontWeight: 700,
          fontSize: "1.05rem",
          color: "#fff",
          margin: 0,
        }}
      >
        {title}
      </h3>
      <p
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 300,
          fontSize: "0.855rem",
          color: "rgba(255,255,255,0.45)",
          lineHeight: 1.7,
          margin: 0,
        }}
      >
        {body}
      </p>
    </div>
  );
}

/* ─── Testimonial ─── */
function Testimonial({
  quote,
  name,
  role,
  initials,
}: {
  quote: string;
  name: string;
  role: string;
  initials: string;
}) {
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "0.5px solid rgba(255,255,255,0.08)",
        borderRadius: 14,
        padding: "1.75rem",
        display: "flex",
        flexDirection: "column",
        gap: "1.25rem",
      }}
    >
      {/* Stars */}
      <div style={{ display: "flex", gap: "0.2rem" }}>
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="#c8553d"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        ))}
      </div>
      <p
        style={{
          fontFamily: "'Playfair Display', serif",
          fontStyle: "italic",
          fontWeight: 400,
          fontSize: "0.9rem",
          color: "rgba(255,255,255,0.72)",
          lineHeight: 1.7,
          margin: 0,
        }}
      >
        "{quote}"
      </p>
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            background: "linear-gradient(135deg,#c8553d,#b8973a)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "0.72rem",
            fontWeight: 500,
            color: "#fff",
            flexShrink: 0,
          }}
        >
          {initials}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.1rem" }}>
          <span
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 500,
              fontSize: "0.82rem",
              color: "rgba(255,255,255,0.85)",
            }}
          >
            {name}
          </span>
          <span
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 300,
              fontSize: "0.75rem",
              color: "rgba(255,255,255,0.38)",
            }}
          >
            {role}
          </span>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════ */
export default function Home() {
  const stats = [
    { num: "42k+", label: "Resumes analysed" },
    { num: "3.8×", label: "More callbacks" },
    { num: "97%", label: "ATS pass rate" },
  ];

  const features = [
    {
      title: "ATS Optimization",
      body: "Get your resume past Applicant Tracking Systems. We detect every blocker before the recruiter even sees your name.",
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      delay: "0.1s",
    },
    {
      title: "Skills Matching",
      body: "See exactly how your skills align with the job description and discover what you're missing.",
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <path d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      delay: "0.2s",
    },
    {
      title: "Shortlisting Score",
      body: "AI calculates your shortlisting probability based on resume quality and role compatibility.",
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M12 6v6l4 2" />
        </svg>
      ),
      delay: "0.3s",
    },
    {
      title: "Actionable Feedback",
      body: "No vague ratings — get specific, prioritised improvements you can act on today.",
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      delay: "0.4s",
    },
    {
      title: "Instant Analysis",
      body: "Upload, paste a job description, and get deep AI feedback in under 30 seconds.",
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
        </svg>
      ),
      delay: "0.5s",
    },
    {
      title: "Privacy First",
      body: "Your resume data is never stored or shared. Every analysis runs in an isolated, secure session.",
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        >
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      ),
      delay: "0.6s",
    },
  ];

  const steps = [
    {
      num: "1",
      title: "Upload Your Resume",
      body: "Drop your PDF or DOCX file. We parse it instantly with zero formatting loss.",
    },
    {
      num: "2",
      title: "Paste the Job Description",
      body: "Copy the role you're targeting. Our AI reads between the lines too.",
    },
    {
      num: "3",
      title: "Get Your Full Analysis",
      body: "ATS score, skills gap, shortlisting probability, and a prioritised action plan — in seconds.",
    },
  ];

  const testimonials = [
    {
      quote:
        "Resumify flagged three ATS blockers I never knew about. One week later I had two interview requests from companies I'd been trying to crack for months.",
      name: "Sneha Rajan",
      role: "Product Manager · Hired at Stripe",
      initials: "SR",
    },
    {
      quote:
        "I went from zero callbacks to three offers in 45 days. The skills gap analysis is what changed everything for me.",
      name: "David Osei",
      role: "Software Engineer · Hired at Shopify",
      initials: "DO",
    },
  ];

  return (
    <>
      {/* ── Page wrapper ─────────────────────────────────── */}
      <div
        style={{
          background: "#0e0e12",
          minHeight: "100vh",
          fontFamily: "'DM Sans', sans-serif",
          overflowX: "hidden",
        }}
      >
        <Navbar />

        {/* ══ HERO ═════════════════════════════════════════ */}
        <section
          style={{
            position: "relative",
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: "8rem 2rem 6rem",
            overflow: "hidden",
          }}
        >
          {/* Orbs */}
          <Orb
            size={600}
            color="radial-gradient(circle, rgba(200,85,61,0.14) 0%, transparent 65%)"
            top={-160}
            right={-160}
            anim="orbFloat1 18s ease-in-out infinite"
          />
          <Orb
            size={500}
            color="radial-gradient(circle, rgba(184,151,58,0.10) 0%, transparent 65%)"
            bottom={-100}
            left={-140}
            anim="orbFloat2 22s ease-in-out infinite"
          />
          <Orb
            size={350}
            color="radial-gradient(circle, rgba(100,120,240,0.08) 0%, transparent 65%)"
            top="40%"
            left="60%"
            anim="orbFloat3 15s ease-in-out infinite"
          />

          {/* Badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.6rem",
              border: "0.5px solid rgba(200,85,61,0.35)",
              borderRadius: 999,
              padding: "0.35rem 1rem",
              marginBottom: "2rem",
              animation: "fadeUp 0.6s cubic-bezier(0.22,1,0.36,1) 0.1s both",
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#c8553d",
                animation: "pulse-dot 1.8s ease-in-out infinite",
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 400,
                fontSize: "0.78rem",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "#c8553d",
              }}
            >
              AI Resume Intelligence
            </span>
          </div>

          {/* Headline */}
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 900,
              fontSize: "clamp(2.8rem, 6vw, 5rem)",
              color: "#fff",
              lineHeight: 1.08,
              letterSpacing: "-0.03em",
              maxWidth: 820,
              margin: "0 auto 1.5rem",
              animation: "fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) 0.25s both",
            }}
          >
            Get hired with{" "}
            <em
              style={{
                fontStyle: "italic",
                color: "#c8553d",
                display: "inline-block",
              }}
            >
              confident
            </em>{" "}
            clarity.
          </h1>

          {/* Sub */}
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 300,
              fontSize: "clamp(1rem, 1.8vw, 1.15rem)",
              color: "rgba(255,255,255,0.52)",
              lineHeight: 1.7,
              maxWidth: 560,
              margin: "0 auto 2.75rem",
              animation: "fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) 0.38s both",
            }}
          >
            AI-powered resume analysis — ATS scores, skills gap, shortlisting
            probability, and a prioritised improvement plan in seconds.
          </p>

          {/* CTA row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              flexWrap: "wrap",
              justifyContent: "center",
              animation: "fadeUp 0.7s cubic-bezier(0.22,1,0.36,1) 0.5s both",
            }}
          >
            <Link
              to="/upload"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 500,
                fontSize: "0.9rem",
                letterSpacing: "0.04em",
                color: "#fff",
                background: "#c8553d",
                border: "none",
                borderRadius: 8,
                padding: "0.85rem 2.2rem",
                cursor: "pointer",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                transition: "background 0.2s, transform 0.15s, box-shadow 0.2s",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = "#b04432";
                el.style.transform = "translateY(-2px)";
                el.style.boxShadow = "0 8px 28px rgba(200,85,61,0.4)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = "#c8553d";
                el.style.transform = "translateY(0)";
                el.style.boxShadow = "none";
              }}
            >
              Analyze My Resume
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            <a
              href="#how"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 400,
                fontSize: "0.875rem",
                color: "rgba(255,255,255,0.55)",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.color = "#fff")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.color =
                  "rgba(255,255,255,0.55)")
              }
            >
              See how it works ↓
            </a>
          </div>
        </section>

        {/* ══ STATS STRIP ══════════════════════════════════ */}
        <div
          style={{
            borderTop: "0.5px solid rgba(255,255,255,0.06)",
            borderBottom: "0.5px solid rgba(255,255,255,0.06)",
          }}
        >
          <div
            style={{
              maxWidth: 960,
              margin: "0 auto",
              padding: "2.5rem 2rem",
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "2rem",
            }}
          >
            {stats.map((s, i) => (
              <div
                key={i}
                style={{ textAlign: "center", display: "flex", flexDirection: "column", gap: "0.3rem" }}
              >
                <span
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontWeight: 700,
                    fontSize: "2.2rem",
                    color: "#fff",
                    lineHeight: 1,
                  }}
                >
                  {s.num}
                </span>
                <span
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 300,
                    fontSize: "0.8rem",
                    color: "rgba(255,255,255,0.38)",
                    letterSpacing: "0.05em",
                  }}
                >
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ══ FEATURES ═════════════════════════════════════ */}
        <section
          id="features"
          style={{ padding: "7rem 2rem", maxWidth: 1120, margin: "0 auto" }}
        >
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 500,
                fontSize: "0.75rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#c8553d",
                marginBottom: "1rem",
              }}
            >
              Why Resumify
            </p>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 900,
                fontSize: "clamp(2rem, 4vw, 3rem)",
                color: "#fff",
                margin: "0 auto",
                maxWidth: 540,
              }}
            >
              Everything you need to land the interview
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "1.25rem",
            }}
          >
            {features.map((f) => (
              <FeatureCard key={f.title} {...f} />
            ))}
          </div>
        </section>

        {/* ══ HOW IT WORKS ════════════════════════════════ */}
        <section
          id="how"
          style={{
            padding: "7rem 2rem",
            background: "rgba(255,255,255,0.02)",
            borderTop: "0.5px solid rgba(255,255,255,0.05)",
            borderBottom: "0.5px solid rgba(255,255,255,0.05)",
          }}
        >
          <div style={{ maxWidth: 1000, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "4rem" }}>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 500,
                  fontSize: "0.75rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "#c8553d",
                  marginBottom: "1rem",
                }}
              >
                Simple process
              </p>
              <h2
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 900,
                  fontSize: "clamp(2rem, 4vw, 3rem)",
                  color: "#fff",
                }}
              >
                Three steps to a better resume
              </h2>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                gap: "3rem",
              }}
            >
              {steps.map((s) => (
                <Step key={s.num} {...s} />
              ))}
            </div>
          </div>
        </section>

        {/* ══ TESTIMONIALS ════════════════════════════════ */}
        <section style={{ padding: "7rem 2rem" }}>
          <div style={{ maxWidth: 880, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 500,
                  fontSize: "0.75rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "#c8553d",
                  marginBottom: "1rem",
                }}
              >
                Real stories
              </p>
              <h2
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 900,
                  fontSize: "clamp(2rem, 4vw, 3rem)",
                  color: "#fff",
                }}
              >
                From rejected to hired
              </h2>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "1.25rem",
              }}
            >
              {testimonials.map((t) => (
                <Testimonial key={t.name} {...t} />
              ))}
            </div>
          </div>
        </section>

        {/* ══ ABOUT ════════════════════════════════════════ */}
        <section
          id="about"
          style={{
            padding: "7rem 2rem",
            background: "rgba(255,255,255,0.02)",
            borderTop: "0.5px solid rgba(255,255,255,0.05)",
          }}
        >
          <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 500,
                fontSize: "0.75rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#c8553d",
                marginBottom: "1.25rem",
              }}
            >
              About Resumify
            </p>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 900,
                fontSize: "clamp(2rem, 4vw, 3rem)",
                color: "#fff",
                marginBottom: "1.5rem",
              }}
            >
              Built for every job seeker
            </h2>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 300,
                fontSize: "1.05rem",
                color: "rgba(255,255,255,0.5)",
                lineHeight: 1.8,
                marginBottom: "1.5rem",
              }}
            >
              We believe landing a great job shouldn't depend on who you know or
              what career coach you can afford. Resumify levels the playing field
              — giving every candidate the same quality of feedback previously
              reserved for executive recruiters.
            </p>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 300,
                fontSize: "1.05rem",
                color: "rgba(255,255,255,0.5)",
                lineHeight: 1.8,
              }}
            >
              Our AI is trained on thousands of successful resumes across
              industries, and we update our models continuously to match what
              hiring managers actually look for.
            </p>
          </div>
        </section>

        {/* ══ CTA BANNER ══════════════════════════════════ */}
        <section
          style={{
            padding: "6rem 2rem",
            position: "relative",
            overflow: "hidden",
            textAlign: "center",
            borderTop: "0.5px solid rgba(255,255,255,0.05)",
          }}
        >
          <Orb
            size={500}
            color="radial-gradient(circle, rgba(200,85,61,0.18) 0%, transparent 70%)"
            top="50%"
            left="50%"
            anim="orbFloat1 20s ease-in-out infinite"
          />
          <div style={{ position: "relative", zIndex: 1 }}>
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 900,
                fontSize: "clamp(2rem, 4vw, 3.2rem)",
                color: "#fff",
                marginBottom: "1.25rem",
              }}
            >
              Your next interview is one upload away.
            </h2>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 300,
                fontSize: "1rem",
                color: "rgba(255,255,255,0.48)",
                marginBottom: "2.5rem",
                maxWidth: 480,
                margin: "0 auto 2.5rem",
              }}
            >
              Join 42,000+ professionals who landed better roles with Resumify.
              It's free, instant, and takes 30 seconds.
            </p>
            <Link
              to="/upload"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 500,
                fontSize: "0.9rem",
                letterSpacing: "0.04em",
                color: "#fff",
                background: "#c8553d",
                border: "none",
                borderRadius: 8,
                padding: "0.9rem 2.5rem",
                cursor: "pointer",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                transition: "background 0.2s, transform 0.15s, box-shadow 0.2s",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = "#b04432";
                el.style.transform = "translateY(-2px)";
                el.style.boxShadow = "0 10px 32px rgba(200,85,61,0.45)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = "#c8553d";
                el.style.transform = "translateY(0)";
                el.style.boxShadow = "none";
              }}
            >
              Start Free — No Sign Up Needed →
            </Link>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}
