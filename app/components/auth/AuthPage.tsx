import LeftPanel from "~/components/auth/LeftPanel";
import AuthForm from "~/components/auth/AuthForm";

export default function AuthPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#faf9f6",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1.5rem",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 1040,
          height: "min(700px, 92vh)",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          borderRadius: 16,
          overflow: "hidden",
          boxShadow:
            "0 32px 80px rgba(0,0,0,0.18), 0 8px 24px rgba(0,0,0,0.1)",
        }}
      >
        <LeftPanel />
        <AuthForm />
      </div>
    </div>
  );
}
