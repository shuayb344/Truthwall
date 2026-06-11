
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import api from "@/lib/axios";
import useAuthStore from "@/store/authStore";
import type { AuthResponse } from "@/types";
 
// ─── Schemas ──────────────────────────────────────────────────
const registerSchema = z.object({
  email: z.email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Must contain an uppercase letter")
    .regex(/[a-z]/, "Must contain a lowercase letter")
    .regex(/[0-9]/, "Must contain a number")
    .regex(/[@$!%*?&]/, "Must contain a special character (@$!%*?&)"),
});
 
const loginSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});
 
type RegisterForm = z.infer<typeof registerSchema>;
type LoginForm = z.infer<typeof loginSchema>;
 
const AuthPage = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();
  const [tab, setTab] = useState<"login" | "register">("login");
  const [showPassword, setShowPassword] = useState(false);
  const [generatedAlias, setGeneratedAlias] = useState<string | null>(null);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
 
  // ─── Register form ──────────────────────────────────────────
  const registerForm = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });
 
  // ─── Login form ─────────────────────────────────────────────
  const loginForm = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });
 
  const onRegister = async (data: RegisterForm) => {
    try {
      const res = await api.post<AuthResponse>("/auth/register", data);
      setAuth(res.data.user, res.data.token);
      setGeneratedAlias(res.data.user.alias);
      toast.success(`Welcome, ${res.data.user.alias}!`);
      setTimeout(() => navigate("/feed"), 1500);
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || err.response?.data?.message || "Registration failed";
      toast.error(errorMessage);
    }
  };
 
  const onLogin = async (data: LoginForm) => {
    try {
      const res = await api.post<AuthResponse>("/auth/login", data);
      setAuth(res.data.user, res.data.token);
      toast.success(`Welcome back, ${res.data.user.alias}!`);
      navigate("/feed");
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || err.response?.data?.message || "Login failed";
      toast.error(errorMessage);
    }
  };
 
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
      {/* Left panel — atmospheric */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(135deg, #0A0A0F 0%, #1a0a2e 50%, #0A0A0F 100%)`,
          }}
        />
        {/* Violet crack light effect */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-px h-3/4 bg-gradient-to-b from-transparent via-[#7C6FF7] to-transparent opacity-60" />
          <div className="absolute w-32 h-32 bg-[#7C6FF7]/20 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 flex flex-col justify-end p-12 text-white">
          <p className="font-mono text-xs text-[#7C6FF7] tracking-widest mb-4 uppercase">
            RADICAL_HONESTY
          </p>
          <h2 className="text-4xl font-bold mb-3 leading-tight">
            Speak your truth.
          </h2>
          <p className="text-[#A0A0B8] text-sm leading-relaxed max-w-sm">
            A sanctuary for vulnerability and anonymous expression, protected by
            the dark.
          </p>
        </div>
      </div>
 
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
 
          {/* Google button */}
          <button
            onClick={onGoogleSignIn}
            disabled={isGoogleLoading}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl border border-[#2A2A3E] bg-[#12121A] hover:border-[#7C6FF7] text-[#EEEEF5] text-sm font-medium transition-all disabled:opacity-50 mb-4"
          >
            {isGoogleLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
            )}
            Continue with Google
          </button>
 
          {/* Divider */}
          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1 h-px bg-[#2A2A3E]" />
            <span className="text-xs text-[#606078]">or</span>
            <div className="flex-1 h-px bg-[#2A2A3E]" />
          </div>
 
          {/* Login form */}
          {tab === "login" && (
            <form onSubmit={loginForm.handleSubmit(onLogin)} className="space-y-4">
              <div>
                <label className="block text-sm text-[#A0A0B8] mb-1.5">Email address</label>
                <input
                  {...loginForm.register("email")}
                  type="email"
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 rounded-xl bg-[#12121A] border border-[#2A2A3E] text-[#EEEEF5] placeholder-[#606078] focus:outline-none focus:border-[#7C6FF7] transition-colors text-sm"
                />
                {loginForm.formState.errors.email && (
                  <p className="text-xs text-red-400 mt-1">{loginForm.formState.errors.email.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm text-[#A0A0B8] mb-1.5">Password</label>
                <div className="relative">
                  <input
                    {...loginForm.register("password")}
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 rounded-xl bg-[#12121A] border border-[#2A2A3E] text-[#EEEEF5] placeholder-[#606078] focus:outline-none focus:border-[#7C6FF7] transition-colors text-sm pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#606078] hover:text-[#A0A0B8]"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {loginForm.formState.errors.password && (
                  <p className="text-xs text-red-400 mt-1">{loginForm.formState.errors.password.message}</p>
                )}
              </div>
              <button
                type="submit"
                disabled={loginForm.formState.isSubmitting}
                className="w-full py-3 rounded-xl bg-[#7C6FF7] hover:bg-[#6B5FE6] text-white font-medium text-sm transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loginForm.formState.isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
                Sign In
              </button>
            </form>
          )}
 
          {/* Register form */}
          {tab === "register" && (
            <form onSubmit={registerForm.handleSubmit(onRegister)} className="space-y-4">
              <div>
                <label className="block text-sm text-[#A0A0B8] mb-1.5">Email address</label>
                <input
                  {...registerForm.register("email")}
                  type="email"
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 rounded-xl bg-[#12121A] border border-[#2A2A3E] text-[#EEEEF5] placeholder-[#606078] focus:outline-none focus:border-[#7C6FF7] transition-colors text-sm"
                />
                {registerForm.formState.errors.email && (
                  <p className="text-xs text-red-400 mt-1">{registerForm.formState.errors.email.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm text-[#A0A0B8] mb-1.5">Password</label>
                <div className="relative">
                  <input
                    {...registerForm.register("password")}
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 rounded-xl bg-[#12121A] border border-[#2A2A3E] text-[#EEEEF5] placeholder-[#606078] focus:outline-none focus:border-[#7C6FF7] transition-colors text-sm pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#606078] hover:text-[#A0A0B8]"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {registerForm.formState.errors.password && (
                  <p className="text-xs text-red-400 mt-1">{registerForm.formState.errors.password.message}</p>
                )}
              </div>
 
              {/* Generated alias reveal */}
              {generatedAlias && (
                <div className="px-4 py-3 rounded-xl bg-[#1C1C28] border border-[#7C6FF7]/30">
                  <p className="text-xs text-[#A0A0B8] mb-1">Your generated alias</p>
                  <p className="font-mono text-[#9D8FFF] font-medium">{generatedAlias}</p>
                </div>
              )}
 
              <button
                type="submit"
                disabled={registerForm.formState.isSubmitting}
                className="w-full py-3 rounded-xl bg-[#7C6FF7] hover:bg-[#6B5FE6] text-white font-medium text-sm transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {registerForm.formState.isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
                Create Account
              </button>
              <p className="text-xs text-center text-[#606078]">
                By joining, you agree to our{" "}
                <span className="text-[#7C6FF7] cursor-pointer">Privacy Sanctuary</span>{" "}
                and{" "}
                <span className="text-[#7C6FF7] cursor-pointer">Code of Silence</span>.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
 
export default AuthPage;
