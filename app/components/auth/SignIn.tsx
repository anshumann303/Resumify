import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "~/context/AuthContext";

const S = {
  field: { marginBottom: "1rem" } as React.CSSProperties,
  label: {
    display: "block",
    fontFamily: "'DM Sans', sans-serif",
    fontWeight: 500,
    fontSize: "0.72rem",
    letterSpacing: "0.06em",
    textTransform: "uppercase" as const,
    color: "#5a5868",
    marginBottom: "0.45rem",
  } as React.CSSProperties,
  input: {
    width: "100%",
    fontFamily: "'DM Sans', sans-serif",
    fontWeight: 400,
    fontSize: "0.875rem",
    color: "#0e0e12",
    background: "#ffffff",
    border: "0.5px solid rgba(0,0,0,0.12)",
    borderRadius: 4,
    padding: "0.7rem 0.9rem",
    outline: "none",
    boxSizing: "border-box" as const,
    boxShadow: "none",
    transition: "border-color 0.2s, box-shadow 0.2s",
  } as React.CSSProperties,
  inputPr: {
    paddingRight: "2.6rem",
  } as React.CSSProperties,
  wrap: { position: "relative" } as React.CSSProperties,
  eyeBtn: {
    position: "absolute" as const,
    right: "0.75rem",
    top: "50%",
    transform: "translateY(-50%)",
    background: "none",
    border: "none",
    cursor: "pointer",
    color: "#b4b2a9",
    display: "flex",
    alignItems: "center",
    padding: 0,
    lineHeight: 1,
  } as React.CSSProperties,
  forgot: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: "0.4rem",
    marginBottom: "0.2rem",
  } as React.CSSProperties,
  forgotLink: {
    fontFamily: "'DM Sans', sans-serif",
    fontWeight: 400,
    fontSize: "0.78rem",
    color: "#c8553d",
    textDecoration: "none",
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: 0,
  } as React.CSSProperties,
  submitBtn: {
    position: "relative" as const,
    overflow: "hidden",
    width: "100%",
    fontFamily: "'DM Sans', sans-serif",
    fontWeight: 500,
    fontSize: "0.82rem",
    letterSpacing: "0.06em",
    textTransform: "uppercase" as const,
    color: "#ffffff",
    background: "#c8553d",
    border: "none",
    borderRadius: 4,
    padding: "0.82rem",
    cursor: "pointer",
    marginTop: "1.1rem",
    marginBottom: "1rem",
    transition: "transform 0.2s, box-shadow 0.2s",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5rem",
  } as React.CSSProperties,
  divider: {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    marginBottom: "1rem",
  } as React.CSSProperties,
  dividerLine: {
    flex: 1,
    height: 0.5,
    background: "rgba(0,0,0,0.12)",
  } as React.CSSProperties,
  dividerText: {
    fontFamily: "'DM Sans', sans-serif",
    fontWeight: 300,
    fontSize: "0.75rem",
    color: "#5a5868",
    whiteSpace: "nowrap" as const,
  } as React.CSSProperties,
  oauthRow: {
    display: "flex",
    gap: "0.7rem",
  } as React.CSSProperties,
  oauthBtn: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.55rem",
    fontFamily: "'DM Sans', sans-serif",
    fontWeight: 400,
    fontSize: "0.82rem",
    color: "#0e0e12",
    background: "#ffffff",
    border: "0.5px solid rgba(0,0,0,0.12)",
    borderRadius: 4,
    padding: "0.65rem 1rem",
    cursor: "pointer",
    transition: "transform 0.2s, box-shadow 0.2s",
  } as React.CSSProperties,
  error: {
    fontFamily: "'DM Sans', sans-serif",
    fontWeight: 400,
    fontSize: "0.78rem",
    color: "#c8553d",
    marginTop: "0.4rem",
    display: "block",
  } as React.CSSProperties,
  successMsg: {
    fontFamily: "'DM Sans', sans-serif",
    fontWeight: 400,
    fontSize: "0.78rem",
    color: "#16a34a",
    marginTop: "0.4rem",
    display: "block",
  } as React.CSSProperties,
};

const EyeIcon = ({ open }: { open: boolean }) =>
  open ? (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ) : (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );

const Spinner = () => (
  <div style={{ width: 16, height: 16, border: "2px solid rgba(255,255,255,0.4)", borderTopColor: "#ffffff", borderRadius: "50%", animation: "authSpin 0.7s linear infinite" }} />
);

const GoogleIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  </svg>
);

const LinkedInIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" fill="#0A66C2" />
  </svg>
);

export default function SignIn() {
  const { signIn, signInWithGoogle, resetPassword } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [resetMsg, setResetMsg] = useState("");
  const [resetLoading, setResetLoading] = useState(false);

  const focusStyle = (focused: boolean): React.CSSProperties =>
    focused
      ? { borderColor: "#c8553d", boxShadow: "0 0 0 3px rgba(200,85,61,0.1)" }
      : {};

  const [emailFocus, setEmailFocus] = useState(false);
  const [pwFocus, setPwFocus] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signIn(email, password);
      navigate("/upload", { replace: true });
    } catch (err: unknown) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogle() {
    setError("");
    setGoogleLoading(true);
    try {
      await signInWithGoogle();
      navigate("/upload", { replace: true });
    } catch (err: unknown) {
      setError((err as Error).message);
    } finally {
      setGoogleLoading(false);
    }
  }

  async function handleForgot() {
    if (!email) {
      setError("Enter your email above first, then click Forgot password.");
      return;
    }
    setResetMsg("");
    setError("");
    setResetLoading(true);
    try {
      await resetPassword(email);
      setResetMsg("Reset link sent! Check your inbox.");
    } catch (err: unknown) {
      setError((err as Error).message);
    } finally {
      setResetLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <div style={S.field}>
        <label style={S.label} htmlFor="si-email">Email address</label>
        <input
          id="si-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          autoComplete="email"
          required
          style={{ ...S.input, ...focusStyle(emailFocus) }}
          onFocus={() => setEmailFocus(true)}
          onBlur={() => setEmailFocus(false)}
        />
      </div>

      <div style={S.field}>
        <label style={S.label} htmlFor="si-pw">Password</label>
        <div style={S.wrap}>
          <input
            id="si-pw"
            type={showPw ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            autoComplete="current-password"
            required
            style={{ ...S.input, ...S.inputPr, ...focusStyle(pwFocus) }}
            onFocus={() => setPwFocus(true)}
            onBlur={() => setPwFocus(false)}
          />
          <button type="button" style={S.eyeBtn} onClick={() => setShowPw((v) => !v)} aria-label="Toggle password">
            <EyeIcon open={showPw} />
          </button>
        </div>
      </div>

      <div style={S.forgot}>
        <button type="button" style={S.forgotLink} onClick={handleForgot} disabled={resetLoading}>
          {resetLoading ? "Sending…" : "Forgot password?"}
        </button>
      </div>

      {resetMsg && <span style={S.successMsg}>{resetMsg}</span>}
      {error && <span style={S.error}>{error}</span>}

      <button type="submit" style={S.submitBtn} disabled={loading}>
        {loading && <Spinner />}
        {loading ? "Signing in…" : "Sign In to Resumify"}
      </button>

      <div style={S.divider}>
        <div style={S.dividerLine} />
        <span style={S.dividerText}>or continue with</span>
        <div style={S.dividerLine} />
      </div>

      <div style={S.oauthRow}>
        <button type="button" style={S.oauthBtn} onClick={handleGoogle} disabled={googleLoading}>
          {googleLoading ? <Spinner /> : <GoogleIcon />}
          Google
        </button>
        <button type="button" style={S.oauthBtn} disabled>
          <LinkedInIcon />
          LinkedIn
        </button>
      </div>

      <style>{`
        @keyframes authSpin { to { transform: rotate(360deg); } }
      `}</style>
    </form>
  );
}
