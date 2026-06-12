import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "@/lib/axios";
import useAuthStore from "@/store/authStore";
import type { AuthResponse } from "@/types";
import AuthLeftPanel from "@/components/auth/AuthLeftPanel";
import AuthSocial from "@/components/auth/AuthSocial";
import LoginForm from "@/components/auth/LoginForm";
import RegisterForm from "@/components/auth/RegisterForm";

const AuthPage = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();
  const [tab, setTab] = useState<"login" | "register">("login");
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const onGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    try {
      const { signInWithPopup, GoogleAuthProvider } = await import("firebase/auth");
      const { auth } = await import("@/lib/firebase");
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken();
      const res = await api.post<AuthResponse>("/auth/google", { idToken });
      setAuth(res.data.user, res.data.token);
      toast.success(`Welcome, ${res.data.user.alias}!`);
      navigate("/feed");
    } catch (err: any) {
      toast.error("Google sign in failed");
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0F] flex">
      <AuthLeftPanel />

      {/* Right panel — auth form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <span className="text-2xl font-bold">
              Truth<span className="text-[#7C6FF7]">Wall</span>
            </span>
            <p className="text-[#A0A0B8] text-sm mt-1">Welcome back</p>
          </div>

          {/* Tab toggle */}
          <div className="flex rounded-xl bg-[#12121A] border border-[#2A2A3E] p-1 mb-6">
            {(["login", "register"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${
                  tab === t
                    ? "bg-[#7C6FF7] text-white"
                    : "text-[#A0A0B8] hover:text-[#EEEEF5]"
                }`}
              >
                {t === "login" ? "Sign In" : "Sign Up"}
              </button>
            ))}
          </div>

          <AuthSocial onGoogleSignIn={onGoogleSignIn} isLoading={isGoogleLoading} />

          {tab === "login" ? <LoginForm /> : <RegisterForm />}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
