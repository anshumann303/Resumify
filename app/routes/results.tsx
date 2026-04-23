import { useEffect } from "react";
import { useNavigate, Link } from "react-router";
import Navbar from "~/components/Navbar";
import Footer from "~/components/Footer";
import { useResumeAnalysisStore } from "~/lib/store";

export function meta() {
  return [
    { title: "Analysis Results — Resumify" },
    {
      name: "description",
      content:
        "View your resume analysis results: ATS score, skills match, shortlisting probability and improvement suggestions.",
    },
  ];
}

/* ─── Helpers ─── */
type ScoreLevel = "high" | "mid" | "low";
function level(score: number): ScoreLevel {
  if (score >= 80) return "high";
  if (score >= 60) return "mid";
  return "low";
}
const levelColors: Record<ScoreLevel, { text: string; glow: string; bar: string }> = {
  high: { text: "#4ade80", glow: "rgba(74,222,128,0.25)", bar: "#4ade80" },
  mid:  { text: "#facc15", glow: "rgba(250,204,21,0.22)",  bar: "#facc15" },
  low:  { text: "#c8553d", glow: "rgba(200,85,61,0.28)",   bar: "#c8553d" },
};

/* ─── Score Card ─── */
function ScoreCard({
  label,
  score,
  suffix = "",
}: {
  label: string;
  score: number;
  suffix?: string;
}) {
  const lv = level(score);
  const c = levelColors[lv];
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "0.5px solid rgba(255,255,255,0.08)",
        borderRadius: 14,
        padding: "2rem 1.75rem",
        display: "flex",
        flexDirection: "column",
        gap: "1.25rem",
        flex: 1,
        minWidth: 180,
      }}
    >
      <span
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 500,
          fontSize: "0.72rem",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.38)",
        }}
      >
        {label}
      </span>
      <div
        style={{
          fontFamily: "'Playfair Display', serif",
          fontWeight: 900,
          fontSize: "3.5rem",
          color: c.text,
          lineHeight: 1,
          textShadow: `0 0 32px ${c.glow}`,
        }}
      >
        {score}
        <span style={{ fontSize: "1.8rem", opacity: 0.7 }}>{suffix}</span>
      </div>
      {/* Progress bar */}
      <div
        style={{
          height: 4,
          background: "rgba(255,255,255,0.06)",
          borderRadius: 999,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${Math.min(score, 100)}%`,
            background: c.bar,
            borderRadius: 999,
            boxShadow: `0 0 10px ${c.glow}`,
            transition: "width 1.2s cubic-bezier(0.22,1,0.36,1)",
          }}
        />
      </div>
    </div>
  );
}

/* ─── Skill chip ─── */
function SkillChip({
  skill,
  type,
}: {
  skill: string;
  type: "matched" | "missing";
}) {
  const matched = type === "matched";
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.35rem",
        padding: "0.3rem 0.75rem",
        borderRadius: 999,
        fontFamily: "'DM Sans', sans-serif",
        fontWeight: 400,
        fontSize: "0.8rem",
        background: matched
          ? "rgba(74,222,128,0.08)"
          : "rgba(200,85,61,0.08)",
        border: `0.5px solid ${matched ? "rgba(74,222,128,0.25)" : "rgba(200,85,61,0.25)"}`,
        color: matched ? "#4ade80" : "#c8553d",
      }}
    >
      {matched ? "✓" : "×"} {skill}
    </span>
  );
}

/* ═══════════════════════════════════════════════════════════ */
const Results = () => {
  const navigate = useNavigate();
  const { analysisResult, uploadedFile } = useResumeAnalysisStore();

  useEffect(() => {
    if (!analysisResult) navigate("/upload");
  }, [analysisResult, navigate]);

  if (!analysisResult) return null;

  return (
    <>
      <div
        style={{
          background: "#0e0e12",
          minHeight: "100vh",
          fontFamily: "'DM Sans', sans-serif",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Navbar />

        <main
          style={{
            flex: 1,
            maxWidth: 1040,
            width: "100%",
            margin: "0 auto",
            padding: "8rem 2rem 5rem",
          }}
        >
          {/* Header */}
          <div
            style={{
              marginBottom: "3rem",
              animation: "fadeUp 0.6s cubic-bezier(0.22,1,0.36,1) 0.1s both",
            }}
          >
            <Link
              to="/upload"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 400,
                fontSize: "0.82rem",
                color: "rgba(255,255,255,0.38)",
                textDecoration: "none",
                marginBottom: "1.75rem",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.75)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.color = "rgba(255,255,255,0.38)")
              }
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Back to upload
            </Link>

            <h1
              style={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 900,
                fontSize: "clamp(2rem, 4vw, 3rem)",
                color: "#fff",
                letterSpacing: "-0.02em",
                marginBottom: "0.5rem",
              }}
            >
              Resume Analysis Results
            </h1>
            {uploadedFile && (
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 300,
                  fontSize: "0.9rem",
                  color: "rgba(255,255,255,0.38)",
                }}
              >
                Analysed:{" "}
                <span style={{ color: "rgba(255,255,255,0.65)" }}>
                  {uploadedFile.name}
                </span>
              </p>
            )}
          </div>

          {/* Score cards row */}
          <div
            style={{
              display: "flex",
              gap: "1.25rem",
              flexWrap: "wrap",
              marginBottom: "2.5rem",
              animation: "fadeUp 0.6s cubic-bezier(0.22,1,0.36,1) 0.2s both",
            }}
          >
            <ScoreCard label="ATS Score" score={analysisResult.atsScore} />
            <ScoreCard
              label="Skills Match"
              score={analysisResult.skillsMatchScore}
              suffix="%"
            />
            <ScoreCard
              label="Shortlisting Probability"
              score={analysisResult.shortlistingProbability}
              suffix="%"
            />
          </div>

          {/* Two-column grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1.25rem",
              marginBottom: "1.25rem",
              animation: "fadeUp 0.6s cubic-bezier(0.22,1,0.36,1) 0.3s both",
            }}
            className="max-md:grid-cols-1"
          >
            {/* Skills analysis */}
            <div
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "0.5px solid rgba(255,255,255,0.08)",
                borderRadius: 14,
                padding: "1.75rem",
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem",
              }}
            >
              <h2
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 700,
                  fontSize: "1.2rem",
                  color: "#fff",
                  margin: 0,
                }}
              >
                Skills Analysis
              </h2>

              {analysisResult.matchedSkills.length > 0 && (
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  <span
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontWeight: 500,
                      fontSize: "0.72rem",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: "rgba(74,222,128,0.7)",
                    }}
                  >
                    Matched
                  </span>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                    {analysisResult.matchedSkills.map((skill, i) => (
                      <SkillChip key={i} skill={skill} type="matched" />
                    ))}
                  </div>
                </div>
              )}

              {analysisResult.missingSkills.length > 0 && (
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  <span
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontWeight: 500,
                      fontSize: "0.72rem",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: "rgba(200,85,61,0.7)",
                    }}
                  >
                    Missing
                  </span>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                    {analysisResult.missingSkills.map((skill, i) => (
                      <SkillChip key={i} skill={skill} type="missing" />
                    ))}
                  </div>
                </div>
              )}

              {analysisResult.matchedSkills.length === 0 &&
                analysisResult.missingSkills.length === 0 && (
                  <p
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontWeight: 300,
                      fontSize: "0.875rem",
                      color: "rgba(255,255,255,0.38)",
                    }}
                  >
                    No specific skills identified in the job description.
                  </p>
                )}
            </div>

            {/* ATS improvements */}
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
              <h2
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 700,
                  fontSize: "1.2rem",
                  color: "#fff",
                  margin: 0,
                }}
              >
                ATS Improvements
              </h2>

              {analysisResult.atsImprovements.length > 0 ? (
                <ol
                  style={{
                    margin: 0,
                    padding: 0,
                    listStyle: "none",
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                  }}
                >
                  {analysisResult.atsImprovements.map((item, i) => (
                    <li
                      key={i}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "0.85rem",
                      }}
                    >
                      <div
                        style={{
                          width: 24,
                          height: 24,
                          borderRadius: "50%",
                          background: "rgba(200,85,61,0.15)",
                          border: "0.5px solid rgba(200,85,61,0.35)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                          fontFamily: "'Playfair Display', serif",
                          fontWeight: 700,
                          fontSize: "0.7rem",
                          color: "#c8553d",
                          marginTop: 1,
                        }}
                      >
                        {i + 1}
                      </div>
                      <p
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontWeight: 300,
                          fontSize: "0.875rem",
                          color: "rgba(255,255,255,0.6)",
                          lineHeight: 1.65,
                          margin: 0,
                        }}
                      >
                        {item}
                      </p>
                    </li>
                  ))}
                </ol>
              ) : (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.75rem",
                    padding: "2rem 0",
                    textAlign: "center",
                  }}
                >
                  <span style={{ fontSize: "2.5rem" }}>🎉</span>
                  <p
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontWeight: 400,
                      fontSize: "0.875rem",
                      color: "#4ade80",
                    }}
                  >
                    Your resume is already well-optimised for ATS systems.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Overall Feedback */}
          <div
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "0.5px solid rgba(255,255,255,0.08)",
              borderRadius: 14,
              padding: "1.75rem",
              marginBottom: "3rem",
              animation: "fadeUp 0.6s cubic-bezier(0.22,1,0.36,1) 0.4s both",
            }}
          >
            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 700,
                fontSize: "1.2rem",
                color: "#fff",
                marginBottom: "1rem",
              }}
            >
              Overall Feedback
            </h2>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 300,
                fontSize: "0.9rem",
                color: "rgba(255,255,255,0.55)",
                lineHeight: 1.8,
                whiteSpace: "pre-line",
                margin: 0,
              }}
            >
              {analysisResult.overallFeedback}
            </p>
          </div>

          {/* Action buttons */}
          <div
            style={{
              display: "flex",
              gap: "1rem",
              flexWrap: "wrap",
              justifyContent: "center",
              animation: "fadeUp 0.6s cubic-bezier(0.22,1,0.36,1) 0.5s both",
            }}
          >
            <Link
              to="/upload"
              id="analyze-another-btn"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 500,
                fontSize: "0.85rem",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                color: "#fff",
                background: "#c8553d",
                border: "none",
                borderRadius: 8,
                padding: "0.8rem 2rem",
                cursor: "pointer",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                transition: "background 0.2s, transform 0.15s",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = "#b04432";
                el.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = "#c8553d";
                el.style.transform = "translateY(0)";
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              Analyze Another Resume
            </Link>

            <button
              id="print-results-btn"
              onClick={() => window.print()}
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 400,
                fontSize: "0.85rem",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.6)",
                background: "transparent",
                border: "0.5px solid rgba(255,255,255,0.12)",
                borderRadius: 8,
                padding: "0.8rem 2rem",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                transition: "border-color 0.2s, color 0.2s",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLButtonElement;
                el.style.borderColor = "rgba(255,255,255,0.3)";
                el.style.color = "rgba(255,255,255,0.9)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLButtonElement;
                el.style.borderColor = "rgba(255,255,255,0.12)";
                el.style.color = "rgba(255,255,255,0.6)";
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="6 9 6 2 18 2 18 9" />
                <path d="M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2" />
                <rect x="6" y="14" width="12" height="8" />
              </svg>
              Print Results
            </button>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default Results;