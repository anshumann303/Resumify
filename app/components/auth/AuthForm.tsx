import { useState } from "react";
import SignIn from "~/components/auth/SignIn";
import SignUp from "~/components/auth/SignUp";

type Tab = "login" | "signup";

export default function AuthForm() {
  const [tab, setTab] = useState<Tab>("login");

  return (
    <div
      style={{
        background: "#faf9f6",
        padding: "2.5rem 3rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        overflowY: "auto",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {/* Heading */}
      <div
        style={{
          marginBottom: "1.75rem",
          animation: "afFadeUp 0.5s cubic-bezier(0.22,1,0.36,1) 0.15s both",
        }}
      >
        <h1
          style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700,
            fontSize: "1.65rem",
            color: "#0e0e12",
            letterSpacing: "-0.02em",
            marginBottom: "0.3rem",
          }}
        >
          {tab === "login" ? "Welcome back" : "Create account"}
        </h1>
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 300,
            fontSize: "0.855rem",
            color: "#5a5868",
          }}
        >
          {tab === "login"
            ? "Sign in to your account or create a new one."
            : "Join 42,000+ professionals who landed better roles."}
        </p>
      </div>

      {/* Tab switcher */}
      <div
        style={{
          display: "flex",
          background: "#f0ede8",
          borderRadius: 999,
          padding: 4,
          marginBottom: "1.75rem",
          animation: "afFadeUp 0.5s cubic-bezier(0.22,1,0.36,1) 0.28s both",
        }}
      >
        {(["login", "signup"] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            style={{
              flex: 1,
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 500,
              fontSize: "0.82rem",
              color: tab === t ? "#faf9f6" : "#5a5868",
              background: tab === t ? "#0e0e12" : "transparent",
              border: "none",
              padding: "0.55rem 0",
              borderRadius: 999,
              cursor: "pointer",
              transition: "background 0.25s, color 0.25s",
            }}
          >
            {t === "login" ? "Sign In" : "Create Account"}
          </button>
        ))}
      </div>

      {/* Panels */}
      <div
        key={tab}
        style={{
          animation: "afFormIn 0.35s cubic-bezier(0.22,1,0.36,1) both",
        }}
      >
        {tab === "login" ? <SignIn /> : <SignUp />}
      </div>

      <style>{`
        @keyframes afFadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes afFormIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
