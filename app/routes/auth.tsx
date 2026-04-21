import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "~/context/AuthContext";
import AuthPage from "~/components/auth/AuthPage";

export function meta() {
  return [
    { title: "Sign In — Resumify" },
    {
      name: "description",
      content:
        "Sign in to Resumify or create a free account to start analysing your resume with AI.",
    },
  ];
}

export default function AuthRoute() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      navigate("/upload", { replace: true });
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          background: "#faf9f6",
        }}
      >
        <div
          style={{
            width: 40,
            height: 40,
            border: "2px solid #c8553d",
            borderTopColor: "transparent",
            borderRadius: "50%",
            animation: "spin 0.7s linear infinite",
          }}
        />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (user) return null;

  return <AuthPage />;
}
