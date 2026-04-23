import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  type User,
} from "firebase/auth";
import { auth, googleProvider } from "~/firebase";

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  signUp: (email: string, password: string, displayName: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

function mapFirebaseError(code: string, message?: string): string {
  // Handle CONFIGURATION_NOT_FOUND coming back as a raw message
  if (message?.includes("CONFIGURATION_NOT_FOUND")) {
    return "Google Sign-In is not enabled in the Firebase project. Please enable it in the Firebase Console under Authentication → Sign-in method → Google.";
  }
  const map: Record<string, string> = {
    "auth/user-not-found": "No account found with this email.",
    "auth/wrong-password": "Incorrect password. Please try again.",
    "auth/invalid-credential": "Invalid email or password.",
    "auth/email-already-in-use": "An account with this email already exists.",
    "auth/invalid-email": "Please enter a valid email address.",
    "auth/weak-password": "Password must be at least 6 characters.",
    "auth/popup-closed-by-user": "Google sign-in was cancelled.",
    "auth/popup-blocked": "Pop-up was blocked by your browser. Allow pop-ups for this site and try again.",
    "auth/network-request-failed": "Network error. Please check your connection.",
    "auth/too-many-requests": "Too many attempts. Please try again later.",
    "auth/user-disabled": "This account has been disabled.",
    "auth/unauthorized-domain": "This domain is not authorised in Firebase. Add 'localhost' to the Firebase Console under Authentication → Settings → Authorised domains.",
    "auth/configuration-not-found": "Google Sign-In is not enabled in the Firebase project. Please enable it in the Firebase Console under Authentication → Sign-in method → Google.",
    "auth/operation-not-allowed": "Google Sign-In is not enabled. Enable it in the Firebase Console under Authentication → Sign-in method.",
    "auth/cancelled-popup-request": "Sign-in cancelled.",
    "auth/internal-error": "An internal error occurred. Please try again.",
    "auth/account-exists-with-different-credential": "An account already exists with this email using a different sign-in method.",
  };
  return map[code] ?? `Sign-in failed (${code || "unknown"}). Please try again or use email/password.`;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Handle redirect result (when signInWithRedirect is used)
    getRedirectResult(auth).catch(() => {
      // ignore — no redirect result or user cancelled
    });

    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  async function signUp(email: string, password: string, displayName: string) {
    try {
      const credential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(credential.user, { displayName });
    } catch (err: unknown) {
      const e = err as { code?: string; message?: string };
      throw new Error(mapFirebaseError(e.code ?? "", e.message));
    }
  }

  async function signIn(email: string, password: string) {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: unknown) {
      const e = err as { code?: string; message?: string };
      throw new Error(mapFirebaseError(e.code ?? "", e.message));
    }
  }

  async function signInWithGoogle() {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err: unknown) {
      const e = err as { code?: string; message?: string };
      // If popup is blocked or fails, fall back to redirect
      if (
        e.code === "auth/popup-blocked" ||
        e.code === "auth/cancelled-popup-request"
      ) {
        await signInWithRedirect(auth, googleProvider);
        return;
      }
      throw new Error(mapFirebaseError(e.code ?? "", e.message));
    }
  }

  async function logout() {
    await signOut(auth);
  }

  async function resetPassword(email: string) {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (err: unknown) {
      const e = err as { code?: string; message?: string };
      throw new Error(mapFirebaseError(e.code ?? "", e.message));
    }
  }

  return (
    <AuthContext.Provider
      value={{ user, loading, signUp, signIn, signInWithGoogle, logout, resetPassword }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
