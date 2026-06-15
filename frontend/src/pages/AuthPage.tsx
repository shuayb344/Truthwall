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
import logo from "@/assets/logo.png";

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
    <div className="min-h-screen bg-[#080808] flex">
      <AuthLeftPanel />

      {/* Right panel — auth form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <img src={logo} alt="Logo" className="w-12 h-12 mx-auto mb-3" />
            <span className="text-2xl font-heading">
              Truth<span className="text-[#E03030]">Wall</span>
            </span>
            <p className="text-[#999999] text-sm mt-1">Welcome back</p>
          </div>

          {/* Tab toggle */}
          <div className="flex rounded-xl bg-[#111111] border border-[#2A2A2A] p-1 mb-6">
            {(["login", "register"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${
                  tab === t
                    ? "bg-[#E03030] text-white"
                    : "text-[#999999] hover:text-[#F5F5F5]"
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
