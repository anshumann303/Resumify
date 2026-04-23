import { useState } from "react";
import { useNavigate } from "react-router";
import Navbar from "~/components/Navbar";
import Footer from "~/components/Footer";
import FileUploader from "~/components/FileUploader";
import { useResumeAnalysisStore } from "~/lib/store";

export function meta() {
  return [
    { title: "Upload Resume — Resumify" },
    {
      name: "description",
      content:
        "Upload your resume and paste a job description to get instant AI-powered analysis.",
    },
  ];
}

const Upload = () => {
  const navigate = useNavigate();
  const { analyzeResume, isAnalyzing, error, clearError, setJobDescription, jobDescription } =
    useResumeAnalysisStore();

  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleFileSelect = (file: File | null) => {
    setUploadedFile(file);
    clearError();
  };

  const handleJobDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJobDescription(e.target.value);
    clearError();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadedFile || !jobDescription.trim()) return;
    try {
      await analyzeResume(uploadedFile, jobDescription);
      navigate("/results");
    } catch (err) {
      console.error("Analysis failed:", err);
    }
  };

  const canSubmit = !!uploadedFile && !!jobDescription.trim() && !isAnalyzing;

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
            maxWidth: 980,
            width: "100%",
            margin: "0 auto",
            padding: "8rem 2rem 5rem",
          }}
        >
          {/* Page header */}
          <div
            style={{
              textAlign: "center",
              marginBottom: "3.5rem",
              animation: "fadeUp 0.6s cubic-bezier(0.22,1,0.36,1) 0.1s both",
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                border: "0.5px solid rgba(200,85,61,0.35)",
                borderRadius: 999,
                padding: "0.3rem 0.9rem",
                marginBottom: "1.5rem",
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "#c8553d",
                  flexShrink: 0,
                  animation: "pulse-dot 1.8s ease-in-out infinite",
                }}
              />
              <span
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 400,
                  fontSize: "0.75rem",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "#c8553d",
                }}
              >
                AI Resume Analysis
              </span>
            </div>
            <h1
              style={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 900,
                fontSize: "clamp(2rem, 4vw, 3rem)",
                color: "#fff",
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                marginBottom: "0.75rem",
              }}
            >
              Analyze Your Resume
            </h1>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontWeight: 300,
                fontSize: "1rem",
                color: "rgba(255,255,255,0.45)",
                lineHeight: 1.7,
                maxWidth: 500,
                margin: "0 auto",
              }}
            >
              Upload your resume and paste the job description — we'll give you a full ATS report in under 30 seconds.
            </p>
          </div>

          {/* Error banner */}
          {error && (
            <div
              style={{
                background: "rgba(200,85,61,0.1)",
                border: "0.5px solid rgba(200,85,61,0.35)",
                borderRadius: 10,
                padding: "1rem 1.25rem",
                marginBottom: "2rem",
                display: "flex",
                alignItems: "flex-start",
                gap: "0.75rem",
              }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#c8553d"
                strokeWidth="1.8"
                style={{ flexShrink: 0, marginTop: 1 }}
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <div>
                <p style={{ fontWeight: 500, fontSize: "0.875rem", color: "#c8553d", marginBottom: "0.25rem" }}>
                  Analysis failed
                </p>
                <p style={{ fontWeight: 300, fontSize: "0.825rem", color: "rgba(200,85,61,0.8)" }}>
                  {error}
                </p>
              </div>
            </div>
          )}

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}
          >
            {/* Two-col layout */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1.75rem",
                animation: "fadeUp 0.6s cubic-bezier(0.22,1,0.36,1) 0.2s both",
              }}
              className="max-md:grid-cols-1"
            >
              {/* File upload */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                <label
                  htmlFor="resume-upload"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 500,
                    fontSize: "0.72rem",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.4)",
                  }}
                >
                  Resume File
                </label>
                <div
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "0.5px solid rgba(255,255,255,0.08)",
                    borderRadius: 12,
                    overflow: "hidden",
                  }}
                >
                  <FileUploader
                    onFileSelect={handleFileSelect}
                    acceptedTypes={{
                      "application/pdf": [".pdf"],
                      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
                        [".docx"],
                    }}
                  />
                </div>
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 300,
                    fontSize: "0.75rem",
                    color: "rgba(255,255,255,0.28)",
                  }}
                >
                  PDF or DOCX · Max 10 MB
                </p>
              </div>

              {/* Job description */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                <label
                  htmlFor="job-description"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 500,
                    fontSize: "0.72rem",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.4)",
                  }}
                >
                  Job Description
                </label>
                <textarea
                  id="job-description"
                  value={jobDescription}
                  onChange={handleJobDescriptionChange}
                  placeholder="Paste the full job description here — requirements, responsibilities, and skills…"
                  rows={11}
                  required
                  style={{
                    width: "100%",
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 300,
                    fontSize: "0.875rem",
                    color: "rgba(255,255,255,0.75)",
                    background: "rgba(255,255,255,0.03)",
                    border: "0.5px solid rgba(255,255,255,0.08)",
                    borderRadius: 12,
                    padding: "1rem",
                    outline: "none",
                    resize: "vertical",
                    lineHeight: 1.7,
                    boxSizing: "border-box",
                    transition: "border-color 0.2s, box-shadow 0.2s",
                    minHeight: 260,
                  }}
                  onFocus={(e) => {
                    (e.target as HTMLTextAreaElement).style.borderColor =
                      "rgba(200,85,61,0.45)";
                    (e.target as HTMLTextAreaElement).style.boxShadow =
                      "0 0 0 3px rgba(200,85,61,0.08)";
                  }}
                  onBlur={(e) => {
                    (e.target as HTMLTextAreaElement).style.borderColor =
                      "rgba(255,255,255,0.08)";
                    (e.target as HTMLTextAreaElement).style.boxShadow = "none";
                  }}
                />
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 300,
                    fontSize: "0.75rem",
                    color: "rgba(255,255,255,0.28)",
                  }}
                >
                  The more complete the description, the better the match analysis
                </p>
              </div>
            </div>

            {/* Submit */}
            <div
              style={{
                animation: "fadeUp 0.6s cubic-bezier(0.22,1,0.36,1) 0.35s both",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "0.75rem",
              }}
            >
              <button
                type="submit"
                id="analyze-btn"
                disabled={!canSubmit}
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 500,
                  fontSize: "0.875rem",
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  color: "#fff",
                  background: canSubmit ? "#c8553d" : "rgba(255,255,255,0.08)",
                  border: "none",
                  borderRadius: 8,
                  padding: "0.9rem 3rem",
                  cursor: canSubmit ? "pointer" : "not-allowed",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.65rem",
                  transition: "background 0.2s, transform 0.15s, box-shadow 0.2s",
                  minWidth: 220,
                  justifyContent: "center",
                }}
                onMouseEnter={(e) => {
                  if (!canSubmit) return;
                  const el = e.currentTarget as HTMLButtonElement;
                  el.style.background = "#b04432";
                  el.style.transform = "translateY(-1px)";
                  el.style.boxShadow = "0 8px 28px rgba(200,85,61,0.4)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLButtonElement;
                  el.style.background = canSubmit
                    ? "#c8553d"
                    : "rgba(255,255,255,0.08)";
                  el.style.transform = "translateY(0)";
                  el.style.boxShadow = "none";
                }}
              >
                {isAnalyzing ? (
                  <>
                    <div
                      style={{
                        width: 16,
                        height: 16,
                        border: "2px solid rgba(255,255,255,0.3)",
                        borderTopColor: "#fff",
                        borderRadius: "50%",
                        animation: "spin 0.7s linear infinite",
                        flexShrink: 0,
                      }}
                    />
                    Analyzing…
                  </>
                ) : (
                  <>
                    Analyze Resume
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
                  </>
                )}
              </button>
              {!uploadedFile && (
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 300,
                    fontSize: "0.78rem",
                    color: "rgba(255,255,255,0.25)",
                  }}
                >
                  Upload a resume file to continue
                </p>
              )}
            </div>
          </form>

          {/* Features strip */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: "1rem",
              marginTop: "4rem",
              paddingTop: "3rem",
              borderTop: "0.5px solid rgba(255,255,255,0.05)",
              animation: "fadeUp 0.6s cubic-bezier(0.22,1,0.36,1) 0.5s both",
            }}
          >
            {[
              {
                label: "ATS Score",
                desc: "Compatibility with tracking systems",
                color: "#c8553d",
              },
              {
                label: "Skills Match",
                desc: "Gap analysis vs job requirements",
                color: "#b8973a",
              },
              {
                label: "Probability",
                desc: "Shortlisting likelihood score",
                color: "#6678ef",
              },
            ].map((f) => (
              <div
                key={f.label}
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "0.5px solid rgba(255,255,255,0.06)",
                  borderRadius: 10,
                  padding: "1.25rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.4rem",
                }}
              >
                <span
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontWeight: 700,
                    fontSize: "1.1rem",
                    color: f.color,
                  }}
                >
                  {f.label}
                </span>
                <span
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 300,
                    fontSize: "0.8rem",
                    color: "rgba(255,255,255,0.35)",
                  }}
                >
                  {f.desc}
                </span>
              </div>
            ))}
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default Upload;
