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

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginForm = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onLogin = async (data: LoginFormValues) => {
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

  return (
    <form onSubmit={handleSubmit(onLogin)} className="space-y-4">
      <div>
        <label className="block text-sm text-[#999999] mb-1.5">Email address</label>
        <input
          {...register("email")}
          type="email"
          placeholder="you@example.com"
          autoComplete="off"
          className="w-full px-4 py-3 rounded-xl bg-[#111111] border border-[#2A2A2A] text-[#F5F5F5] placeholder-[#555555] focus:outline-none focus:border-[#E03030] transition-colors text-sm"
        />
        {errors.email && (
          <p className="text-xs text-red-400 mt-1">{errors.email.message}</p>
        )}
      </div>
      <div>
        <label className="block text-sm text-[#999999] mb-1.5">Password</label>
        <div className="relative">
          <input
            {...register("password")}
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            autoComplete="off"
            className="w-full px-4 py-3 rounded-xl bg-[#111111] border border-[#2A2A2A] text-[#F5F5F5] placeholder-[#555555] focus:outline-none focus:border-[#E03030] transition-colors text-sm pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#555555] hover:text-[#999999]"
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
        {errors.password && (
          <p className="text-xs text-red-400 mt-1">{errors.password.message}</p>
        )}
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3 rounded-xl bg-[#E03030] hover:bg-[#C42020] text-white font-medium text-sm transition-all disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
        Sign In
      </button>
    </form>
  );
};

export default LoginForm;
