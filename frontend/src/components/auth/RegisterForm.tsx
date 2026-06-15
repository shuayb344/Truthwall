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

const registerSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Must contain an uppercase letter")
    .regex(/[a-z]/, "Must contain a lowercase letter")
    .regex(/[0-9]/, "Must contain a number")
    .regex(/[@$!%*?&]/, "Must contain a special character (@$!%*?&)"),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

const RegisterForm = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [generatedAlias, setGeneratedAlias] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onRegister = async (data: RegisterFormValues) => {
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

  return (
    <form onSubmit={handleSubmit(onRegister)} className="space-y-4">
      <div>
        <label className="block text-sm text-[#A0A0B8] mb-1.5">Email address</label>
        <input
          {...register("email")}
          type="email"
          placeholder="you@example.com"
          autoComplete="off"
          className="w-full px-4 py-3 rounded-xl bg-[#12121A] border border-[#2A2A3E] text-[#EEEEF5] placeholder-[#606078] focus:outline-none focus:border-[#7C6FF7] transition-colors text-sm"
        />
        {errors.email && (
          <p className="text-xs text-red-400 mt-1">{errors.email.message}</p>
        )}
      </div>
      <div>
        <label className="block text-sm text-[#A0A0B8] mb-1.5">Password</label>
        <div className="relative">
          <input
            {...register("password")}
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            autoComplete="off"
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
        {errors.password && (
          <p className="text-xs text-red-400 mt-1">{errors.password.message}</p>
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
        disabled={isSubmitting}
        className="w-full py-3 rounded-xl bg-[#7C6FF7] hover:bg-[#6B5FE6] text-white font-medium text-sm transition-all disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
        Create Account
      </button>
      <p className="text-xs text-center text-[#606078]">
        By joining, you agree to our{" "}
        <span className="text-[#7C6FF7] cursor-pointer">Privacy Sanctuary</span>{" "}
        and{" "}
        <span className="text-[#7C6FF7] cursor-pointer">Code of Silence</span>.
      </p>
    </form>
  );
};

export default RegisterForm;
